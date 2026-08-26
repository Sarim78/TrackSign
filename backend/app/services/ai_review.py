"""
AI review service — sends contract text to Claude with a risk checklist.
Supports multiple contract types via swappable checklist files.
"""

import json
from pathlib import Path
from typing import Any

import anthropic
from fastapi import HTTPException

from ..core.config import get_settings

CHECKLIST_DIR = Path(__file__).parent.parent / "checklists"

TYPE_MAPPING = {
    "auto-detect": "auto-detect",
    "Auto-detect (recommended)": "auto-detect",
    "Service agreement": "service_agreement",
    "Vendor / supplier contract": "vendor",
    "Non-disclosure agreement (NDA)": "nda",
    "Lease / rental agreement": "lease",
    "Employment contract": "employment",
    "Statement of work (SOW)": "service_agreement",
    "Partnership agreement": "partnership",
    "Licensing agreement": "licensing",
    "Other": "general",
}


def get_available_checklists() -> list[str]:
    """Return list of available checklist names."""
    return [path.stem for path in CHECKLIST_DIR.glob("*.json")]


def load_checklist(checklist_name: str) -> dict[str, Any]:
    """Load a risk checklist JSON file by name."""
    path = CHECKLIST_DIR / f"{checklist_name}.json"
    if not path.exists():
        path = CHECKLIST_DIR / "general.json"
        if not path.exists():
            raise HTTPException(status_code=500, detail="No checklist found")
    with open(path, "r", encoding="utf-8") as handle:
        return json.load(handle)


def detect_contract_type(text: str) -> str:
    """
    Simple keyword-based detection of contract type.
    Returns the best-matching checklist name.
    Falls back to 'general' if unsure.
    """
    text_lower = text.lower()[:3000]

    type_keywords = {
        "nda": ["non-disclosure", "nda", "confidential information", "receiving party", "disclosing party"],
        "employment": ["employee", "employer", "employment", "salary", "benefits", "at-will", "probationary"],
        "lease": ["landlord", "tenant", "lease", "premises", "rent", "security deposit", "eviction"],
        "service_agreement": ["service provider", "client", "deliverables", "scope of work", "milestone"],
        "vendor": ["vendor", "supplier", "purchase order", "supply chain", "delivery schedule"],
        "partnership": ["partner", "partnership", "profit sharing", "joint venture"],
        "licensing": ["licensor", "licensee", "royalt", "license grant", "intellectual property license"],
    }

    scores: dict[str, int] = {}
    for contract_type, keywords in type_keywords.items():
        score = sum(1 for keyword in keywords if keyword in text_lower)
        if score > 0:
            scores[contract_type] = score

    if scores:
        return max(scores, key=scores.get)
    return "general"


def build_prompt(contract_text: str, checklist: dict[str, Any]) -> str:
    """Build the Claude prompt from contract text and checklist."""
    categories = checklist.get("categories", [])
    category_descriptions = "\n".join(
        [f"- {category['name']}: {category['description']}" for category in categories]
    )

    return f"""You are a contract review assistant. You analyze contracts and flag risky, unfair, or unusual terms for the person reviewing the contract.

Review the following contract text against this risk checklist:

{category_descriptions}

For each issue you find, return a JSON object with:
- severity: "high", "medium", or "low"
- category: the checklist category name
- clause: the exact or paraphrased clause from the contract
- explanation: a plain-English explanation of why this matters (2-3 sentences, written for a non-lawyer)
- fairerVersion: what a fairer version of this clause would say

Return your response as a JSON array of findings. If no issues are found for a category, skip it.
Only return the JSON array, no other text. No markdown code fences.

CONTRACT TEXT:
{contract_text}"""


def _strip_code_fences(response_text: str) -> str:
    """Remove optional markdown fences from a model response."""
    cleaned = response_text.strip()
    if cleaned.startswith("```"):
        cleaned = cleaned.split("\n", 1)[1]
        if cleaned.endswith("```"):
            cleaned = cleaned[:-3]
        cleaned = cleaned.strip()
    return cleaned


async def review_contract(contract_text: str, contract_type: str = "auto-detect") -> dict[str, Any]:
    """
    Run AI review on contract text. Auto-detects contract type if not specified.
    Returns dict with 'findings', 'flag_counts', and 'checklist_used'.
    """
    settings = get_settings()

    if contract_type == "auto-detect" or not contract_type:
        checklist_name = detect_contract_type(contract_text)
    else:
        mapped = TYPE_MAPPING.get(contract_type, contract_type)
        if mapped == "auto-detect":
            checklist_name = detect_contract_type(contract_text)
        else:
            checklist_name = mapped

    checklist = load_checklist(checklist_name)
    prompt = build_prompt(contract_text, checklist)

    try:
        client = anthropic.AsyncAnthropic(api_key=settings.ANTHROPIC_API_KEY)
        message = await client.messages.create(
            model=settings.AI_MODEL,
            max_tokens=4096,
            system="You are a contract review assistant. Return only valid JSON arrays. No other text.",
            messages=[{"role": "user", "content": prompt}],
        )

        response_text = _strip_code_fences(message.content[0].text)
        findings = json.loads(response_text)
        if not isinstance(findings, list):
            raise ValueError("Response is not a JSON array")

        validated = []
        for finding in findings:
            if not isinstance(finding, dict):
                continue
            validated.append(
                {
                    "severity": finding.get("severity", "medium"),
                    "category": finding.get("category", "Unknown"),
                    "clause": finding.get("clause", ""),
                    "explanation": finding.get("explanation", ""),
                    "fairerVersion": finding.get("fairerVersion", ""),
                }
            )

        flag_counts = {"high": 0, "medium": 0, "low": 0}
        for finding in validated:
            severity = str(finding["severity"]).lower()
            if severity in flag_counts:
                flag_counts[severity] += 1

        return {
            "findings": validated,
            "flag_counts": flag_counts,
            "checklist_used": checklist_name,
        }

    except json.JSONDecodeError as exc:
        raise HTTPException(
            status_code=500,
            detail="AI returned an invalid response. Please try again.",
        ) from exc
    except anthropic.APIError as exc:
        raise HTTPException(status_code=502, detail=f"AI service error: {str(exc)}") from exc
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Review failed: {str(exc)}") from exc
