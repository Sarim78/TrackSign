"""
Billing routes — Stripe checkout and webhook handling.
"""

from datetime import datetime, timezone

import stripe
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from ..core.config import get_settings
from ..core.security import get_current_user
from ..db import models
from ..db.database import get_db

router = APIRouter(prefix="/api/billing", tags=["billing"])


def _stripe_signature_errors() -> tuple[type[BaseException], ...]:
    """Return Stripe signature exception types across SDK versions."""
    errors: tuple[type[BaseException], ...] = (ValueError,)
    error_mod = getattr(stripe, "error", None)
    if error_mod is not None and hasattr(error_mod, "SignatureVerificationError"):
        errors += (error_mod.SignatureVerificationError,)
    if hasattr(stripe, "SignatureVerificationError"):
        errors += (stripe.SignatureVerificationError,)
    return errors


@router.post("/create-checkout")
async def create_checkout_session(
    user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Create a Stripe Checkout session for upgrading to Pro."""
    settings = get_settings()
    stripe.api_key = settings.STRIPE_SECRET_KEY

    sub = user.subscription
    if not sub:
        sub = models.Subscription(user_id=user.id)
        db.add(sub)
        db.commit()
        db.refresh(sub)

    if not sub.stripe_customer_id:
        customer = stripe.Customer.create(email=user.email, metadata={"user_id": str(user.id)})
        sub.stripe_customer_id = customer.id
        db.commit()

    session = stripe.checkout.Session.create(
        customer=sub.stripe_customer_id,
        payment_method_types=["card"],
        line_items=[{"price": settings.STRIPE_PRICE_ID, "quantity": 1}],
        mode="subscription",
        success_url=f"{settings.FRONTEND_URL}/dashboard?upgraded=true",
        cancel_url=f"{settings.FRONTEND_URL}/dashboard/settings",
        metadata={"user_id": str(user.id)},
    )

    return {"checkout_url": session.url}


@router.post("/webhook")
async def stripe_webhook(request: Request, db: Session = Depends(get_db)):
    """Handle Stripe webhook events. Idempotent processing."""
    settings = get_settings()
    stripe.api_key = settings.STRIPE_SECRET_KEY

    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, settings.STRIPE_WEBHOOK_SECRET)
    except _stripe_signature_errors():
        raise HTTPException(status_code=400, detail="Invalid webhook signature")

    existing = db.query(models.ProcessedEvent).filter(models.ProcessedEvent.id == event.id).first()
    if existing:
        return {"status": "already processed"}

    event_type = event.type
    data = event.data.object

    if event_type in ("customer.subscription.created", "customer.subscription.updated"):
        customer_id = data.customer
        sub = (
            db.query(models.Subscription)
            .filter(models.Subscription.stripe_customer_id == customer_id)
            .first()
        )
        if sub:
            sub.stripe_subscription_id = data.id
            sub.status = "active" if data.status == "active" else data.status
            if data.current_period_end:
                sub.current_period_end = datetime.fromtimestamp(
                    data.current_period_end,
                    tz=timezone.utc,
                )

    elif event_type == "customer.subscription.deleted":
        customer_id = data.customer
        sub = (
            db.query(models.Subscription)
            .filter(models.Subscription.stripe_customer_id == customer_id)
            .first()
        )
        if sub:
            sub.status = "free"
            sub.stripe_subscription_id = None
            sub.current_period_end = None

    db.add(models.ProcessedEvent(id=event.id))
    db.commit()

    return {"status": "processed"}


@router.get("/portal")
async def create_portal_session(user: models.User = Depends(get_current_user)):
    """Create a Stripe Customer Portal session for managing subscription."""
    settings = get_settings()
    stripe.api_key = settings.STRIPE_SECRET_KEY

    sub = user.subscription
    if not sub or not sub.stripe_customer_id:
        raise HTTPException(status_code=400, detail="No active subscription")

    session = stripe.billing_portal.Session.create(
        customer=sub.stripe_customer_id,
        return_url=f"{settings.FRONTEND_URL}/dashboard/settings",
    )
    return {"portal_url": session.url}
