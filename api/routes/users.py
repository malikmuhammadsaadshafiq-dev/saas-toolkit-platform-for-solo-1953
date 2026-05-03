"""User endpoints: current authenticated user profile."""
from __future__ import annotations

from fastapi import APIRouter, Depends

from auth import get_current_user
from models import User
from schemas import UserOut

router = APIRouter(tags=["users"])


@router.get("/me", response_model=UserOut)
async def get_me(user: User = Depends(get_current_user)) -> UserOut:
    """Return the profile of the currently authenticated user."""
    return UserOut.model_validate(user)
