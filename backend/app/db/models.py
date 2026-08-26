"""
Database models — Users, Contracts, Reviews, Subscriptions, ProcessedEvents.
"""

import uuid
from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, ForeignKey, Integer, JSON, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from .database import Base


def utcnow() -> datetime:
    """Return a timezone-aware UTC timestamp."""
    return datetime.now(timezone.utc)


class User(Base):
    """Local user record linked to a Clerk identity."""

    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    clerk_user_id = Column(String, unique=True, nullable=False, index=True)
    email = Column(String, nullable=False)
    review_count = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime(timezone=True), nullable=False, default=utcnow)
    contracts = relationship("Contract", back_populates="user", cascade="all, delete-orphan")
    subscription = relationship(
        "Subscription",
        back_populates="user",
        uselist=False,
        cascade="all, delete-orphan",
    )


class Contract(Base):
    """Uploaded contract file and extracted text."""

    __tablename__ = "contracts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    filename = Column(String, nullable=False)
    file_size = Column(Integer)
    contract_type = Column(String, default="auto-detect")
    extracted_text = Column(Text)
    uploaded_at = Column(DateTime(timezone=True), nullable=False, default=utcnow)
    user = relationship("User", back_populates="contracts")
    review = relationship("Review", back_populates="contract", uselist=False, cascade="all, delete-orphan")


class Review(Base):
    """AI review results for a single contract."""

    __tablename__ = "reviews"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    contract_id = Column(
        UUID(as_uuid=True),
        ForeignKey("contracts.id", ondelete="CASCADE"),
        nullable=False,
        unique=True,
    )
    checklist_used = Column(String, nullable=False, default="general")
    findings = Column(JSON, nullable=False)
    flag_counts = Column(JSON, nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=False, default=utcnow)
    contract = relationship("Contract", back_populates="review")


class Subscription(Base):
    """Stripe subscription state for a user."""

    __tablename__ = "subscriptions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        unique=True,
    )
    stripe_customer_id = Column(String)
    stripe_subscription_id = Column(String)
    status = Column(String, nullable=False, default="free")
    current_period_end = Column(DateTime(timezone=True))
    updated_at = Column(DateTime(timezone=True), nullable=False, default=utcnow, onupdate=utcnow)
    user = relationship("User", back_populates="subscription")


class ProcessedEvent(Base):
    """Idempotency record for Stripe webhook events."""

    __tablename__ = "processed_events"

    id = Column(String, primary_key=True)
    processed_at = Column(DateTime(timezone=True), nullable=False, default=utcnow)
