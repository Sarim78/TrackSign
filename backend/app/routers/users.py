"""
User routes — profile and usage statistics.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..core.security import get_current_user
from ..db import models
from ..db.database import get_db

router = APIRouter(prefix="/api/users", tags=["users"])


@router.get("/me")
async def get_me(user: models.User = Depends(get_current_user)):
    """Return current user profile and subscription status."""
    return {
        "id": str(user.id),
        "email": user.email,
        "review_count": user.review_count,
        "plan": user.subscription.status if user.subscription else "free",
        "created_at": user.created_at.isoformat(),
    }


@router.get("/me/stats")
async def get_stats(
    user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Return review statistics for the current user."""
    reviews = (
        db.query(models.Review)
        .join(models.Contract)
        .filter(models.Contract.user_id == user.id)
        .all()
    )
    total_high = sum(r.flag_counts.get("high", 0) for r in reviews)
    total_medium = sum(r.flag_counts.get("medium", 0) for r in reviews)
    total_low = sum(r.flag_counts.get("low", 0) for r in reviews)

    return {
        "total_reviews": len(reviews),
        "total_flags": {"high": total_high, "medium": total_medium, "low": total_low},
        "review_count": user.review_count,
    }


@router.delete("/me")
async def delete_account(
    user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Delete the current user and all associated data."""
    db.delete(user)
    db.commit()
    return {"detail": "Account deleted"}
