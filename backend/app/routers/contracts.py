"""
Contract routes — upload, review, and retrieve contract reviews.
"""

from uuid import UUID

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy.orm import Session

from ..core.config import get_settings
from ..core.security import get_current_user
from ..db import models
from ..db.database import get_db
from ..services.ai_review import review_contract
from ..services.extraction import extract_text_from_pdf

router = APIRouter(prefix="/api/contracts", tags=["contracts"])


@router.post("/upload")
async def upload_and_review(
    file: UploadFile = File(...),
    contract_type: str = Form(default="auto-detect"),
    user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Upload a PDF, extract text, run AI review, return the report."""
    settings = get_settings()

    filename = file.filename or ""
    if not filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    if file.content_type and file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type.")

    is_free = not user.subscription or user.subscription.status == "free"
    if is_free and user.review_count >= settings.FREE_TIER_LIMIT:
        raise HTTPException(
            status_code=403,
            detail="Free tier limit reached. Upgrade to Pro for unlimited reviews.",
        )

    file_bytes = await file.read()
    if len(file_bytes) > settings.MAX_FILE_SIZE_MB * 1024 * 1024:
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Maximum size is {settings.MAX_FILE_SIZE_MB}MB.",
        )

    extracted_text = extract_text_from_pdf(file_bytes)

    contract = models.Contract(
        user_id=user.id,
        filename=filename,
        file_size=len(file_bytes),
        contract_type=contract_type,
        extracted_text=extracted_text,
    )
    db.add(contract)
    db.commit()
    db.refresh(contract)

    result = await review_contract(extracted_text, contract_type)

    review = models.Review(
        contract_id=contract.id,
        checklist_used=result["checklist_used"],
        findings=result["findings"],
        flag_counts=result["flag_counts"],
    )
    db.add(review)
    user.review_count += 1
    db.commit()
    db.refresh(review)

    return {
        "review_id": str(review.id),
        "contract_id": str(contract.id),
        "filename": contract.filename,
        "file_size": contract.file_size,
        "contract_type": contract.contract_type,
        "checklist_used": result["checklist_used"],
        "findings": result["findings"],
        "flag_counts": result["flag_counts"],
        "created_at": review.created_at.isoformat(),
    }


@router.get("/reviews")
async def get_reviews(
    user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Get all reviews for the current user, newest first."""
    contracts = (
        db.query(models.Contract)
        .filter(models.Contract.user_id == user.id)
        .order_by(models.Contract.uploaded_at.desc())
        .all()
    )

    results = []
    for contract in contracts:
        if contract.review:
            results.append(
                {
                    "review_id": str(contract.review.id),
                    "contract_id": str(contract.id),
                    "filename": contract.filename,
                    "file_size": contract.file_size,
                    "contract_type": contract.contract_type,
                    "findings": contract.review.findings,
                    "flag_counts": contract.review.flag_counts,
                    "created_at": contract.review.created_at.isoformat(),
                }
            )
    return results


@router.get("/reviews/{review_id}")
async def get_review(
    review_id: str,
    user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Get a single review by ID. Only returns reviews owned by the current user."""
    try:
        review_uuid = UUID(review_id)
    except ValueError:
        raise HTTPException(status_code=404, detail="Review not found")

    review = (
        db.query(models.Review)
        .join(models.Contract)
        .filter(models.Review.id == review_uuid, models.Contract.user_id == user.id)
        .first()
    )

    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    return {
        "review_id": str(review.id),
        "contract_id": str(review.contract_id),
        "filename": review.contract.filename,
        "file_size": review.contract.file_size,
        "contract_type": review.contract.contract_type,
        "checklist_used": review.checklist_used,
        "findings": review.findings,
        "flag_counts": review.flag_counts,
        "created_at": review.created_at.isoformat(),
    }
