"""
Auth middleware — verifies Clerk JWT tokens on protected routes.
Creates a local user record on first authentication.
"""

from typing import Any

import httpx
from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from ..core.config import get_settings
from ..db import models
from ..db.database import get_db

security_scheme = HTTPBearer()
_jwks_cache: dict[str, Any] | None = None


async def get_jwks() -> dict[str, Any]:
    """Fetch and cache Clerk's JWKS for token verification."""
    global _jwks_cache
    if _jwks_cache is None:
        settings = get_settings()
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.get(
                settings.CLERK_JWKS_URL,
                headers={"Authorization": f"Bearer {settings.CLERK_SECRET_KEY}"},
            )
            response.raise_for_status()
            _jwks_cache = response.json()
    return _jwks_cache


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security_scheme),
    db: Session = Depends(get_db),
) -> models.User:
    """Verify Clerk JWT and return the local user record."""
    token = credentials.credentials
    settings = get_settings()

    try:
        jwks = await get_jwks()
        unverified_header = jwt.get_unverified_header(token)
        rsa_key = None
        for key in jwks.get("keys", []):
            if key["kid"] == unverified_header.get("kid"):
                rsa_key = key
                break
        if not rsa_key:
            raise HTTPException(status_code=401, detail="Invalid token key")

        payload = jwt.decode(
            token,
            rsa_key,
            algorithms=["RS256"],
            options={"verify_aud": False},
        )
        clerk_user_id = payload.get("sub")
        if not clerk_user_id:
            raise HTTPException(status_code=401, detail="Invalid token payload")
    except HTTPException:
        raise
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    except httpx.HTTPError:
        raise HTTPException(status_code=503, detail="Unable to verify authentication")

    user = db.query(models.User).filter(models.User.clerk_user_id == clerk_user_id).first()
    if not user:
        async with httpx.AsyncClient(timeout=10.0) as client:
            clerk_resp = await client.get(
                f"https://api.clerk.com/v1/users/{clerk_user_id}",
                headers={"Authorization": f"Bearer {settings.CLERK_SECRET_KEY}"},
            )
            clerk_resp.raise_for_status()
            clerk_data = clerk_resp.json()

        email = ""
        if clerk_data.get("email_addresses"):
            email = clerk_data["email_addresses"][0].get("email_address", "")

        user = models.User(clerk_user_id=clerk_user_id, email=email)
        db.add(user)
        db.commit()
        db.refresh(user)

        subscription = models.Subscription(user_id=user.id)
        db.add(subscription)
        db.commit()

    return user
