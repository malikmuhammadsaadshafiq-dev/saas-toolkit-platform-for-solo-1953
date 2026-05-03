"""Database engine, session factory, Base, and initialisation."""
from __future__ import annotations
import os
from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import DeclarativeBase

# Vercel writable temp dir; override via DATABASE_URL env var
DB_URL = os.getenv(
    "DATABASE_URL",
    "sqlite+aiosqlite:////tmp/saas_toolkit.db",
)

engine = create_async_engine(DB_URL, echo=False)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session


async def init_db() -> None:
    """Create tables and seed if empty."""
    import models  # noqa: F401 — registers ORM metadata
    from seed import seed_db

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as session:
        await seed_db(session)
