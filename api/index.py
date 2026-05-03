"""
SaaS Toolkit Platform API — Vercel serverless entry point.
All routes live under /api/* prefix.
"""
from __future__ import annotations
import sys
import os

# Ensure api/ directory is on sys.path for absolute imports
sys.path.insert(0, os.path.dirname(__file__))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import init_db
from routes.tools import router as tools_router
from routes.stacks import router as stacks_router
from routes.auth import router as auth_router
from routes.users import router as users_router
from routes.saved import router as saved_router
from routes.compare import router as compare_router

app = FastAPI(
    title="SaaS Toolkit API",
    description="Curated tools & stacks for solo founders",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup() -> None:
    await init_db()


app.include_router(tools_router, prefix="/api")
app.include_router(stacks_router, prefix="/api")
app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(users_router, prefix="/api")
app.include_router(saved_router, prefix="/api")
app.include_router(compare_router, prefix="/api")


@app.get("/api/health", tags=["health"])
def health() -> dict:
    return {"status": "ok", "service": "saas-toolkit"}
