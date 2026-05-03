"""Auth endpoints: magic-link request and token verification."""
from __future__ import annotations
import secrets
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

import auth as auth_utils
from database import get_db
from models import MagicToken, User
from schemas import MagicLinkRequest, TokenOut, VerifyRequest

router = APIRouter()
_MAGIC_EXPIRE_MIN = 15


@router.post("/magic-link")
async def send_magic_link(
    req: MagicLinkRequest,
    db: AsyncSession = Depends(get_db),
) -> dict:
    """
    Generate a one-time magic-link token for passwordless login.
    In production wire this to your email provider (Resend, Postmark…).
    For development the token is returned in the response body.
    """
    token = secrets.token_urlsafe(32)
    expires = datetime.utcnow() + timedelta(minutes=_MAGIC_EXPIRE_MIN)
    db.add(MagicToken(token=token, email=req.email.lower().strip(), expires_at=expires))
    await db.commit()
    return {
        "message": "Magic link issued. In production this is sent via email.",
        "token": token,  # Remove from response in production!
        "expires_in_minutes": _MAGIC_EXPIRE_MIN,
    }


@router.post("/verify", response_model=TokenOut)
async def verify_magic_link(
    req: VerifyRequest,
    db: AsyncSession = Depends(get_db),
) -> TokenOut:
    """Exchange a magic-link token for a JWT access token."""
    result = await db.execute(
        select(MagicToken).where(MagicToken.token == req.token)
    )
    mt = result.scalar_one_or_none()
    if not mt or mt.used or mt.expires_at < datetime.utcnow():
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    mt.used = True  # single-use

    # Upsert user
    ur = await db.execute(select(User).where(User.email == mt.email))
    user = ur.scalar_one_or_none()
    if not user:
        user = User(email=mt.email)
        db.add(user)
        await db.flush()

    await db.commit()
    return TokenOut(access_token=auth_utils.create_jwt(user.id, user.email))
