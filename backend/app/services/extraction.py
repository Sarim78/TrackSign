"""
PDF text extraction — pulls clean text from uploaded PDFs.
"""

from io import BytesIO

import pdfplumber
from fastapi import HTTPException


def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extract all text from a PDF. Raises 422 if extraction fails."""
    try:
        text_parts: list[str] = []
        with pdfplumber.open(BytesIO(file_bytes)) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text_parts.append(page_text)

        full_text = "\n\n".join(text_parts).strip()
        if not full_text:
            raise HTTPException(
                status_code=422,
                detail="Could not extract text. The file may be scanned or image-based.",
            )
        return full_text
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=422, detail=f"Failed to process PDF: {str(exc)}") from exc
