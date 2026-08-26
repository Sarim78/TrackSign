"""
TrackSign API — main application entry point.
Registers all routers, CORS, and startup events.
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .core.config import get_settings
from .db import models  # noqa: F401  — register models on Base.metadata
from .db.database import Base, engine
from .routers import billing, contracts, users

settings = get_settings()


@asynccontextmanager
async def lifespan(_app: FastAPI):
    """Create database tables on startup."""
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="TrackSign API",
    description="AI-powered contract review",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(contracts.router)
app.include_router(billing.router)


@app.get("/health")
def health_check():
    """Health check endpoint for monitoring."""
    return {"status": "ok", "service": "tracksign-api"}
