"""
Configuration — loads all environment variables with validation.
"""

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Runtime settings loaded from environment variables and .env."""

    DATABASE_URL: str
    CLERK_SECRET_KEY: str
    CLERK_PUBLISHABLE_KEY: str
    CLERK_JWKS_URL: str = "https://api.clerk.com/v1/jwks"
    STRIPE_SECRET_KEY: str
    STRIPE_WEBHOOK_SECRET: str
    STRIPE_PRICE_ID: str
    ANTHROPIC_API_KEY: str
    AI_MODEL: str = "claude-sonnet-4-20250514"
    FRONTEND_URL: str = "http://localhost:3000"
    ENVIRONMENT: str = "development"
    MAX_FILE_SIZE_MB: int = 20
    FREE_TIER_LIMIT: int = 1

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


@lru_cache()
def get_settings() -> Settings:
    """Return a cached Settings instance."""
    return Settings()
