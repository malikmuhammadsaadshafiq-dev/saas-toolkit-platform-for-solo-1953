"""Saved-tools endpoints: save, unsave, and list saved tools."""
from __future__ import annotations
import json
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from auth import get_current_user
from database import get_db
from models import SavedTool, Tool, User
from schemas import SaveRequest, ToolOut

router = APIRouter(tags=["saved"])


def _to_out(t: Tool) -> ToolOut:
    return ToolOut(
        id=t.id, slug=t.slug, name=t.name, tagline=t.tagline or "",
        description=t.description or "", category=t.category,
        pricing_tier=t.pricing_tier or "", stage_fit=t.stage_fit or "",
        website_url=t.website_url or "", affiliate_url=t.affiliate_url or "",
        logo_url=t.logo_url or "", pros_json=t.pros_json or "[]",
        cons_json=t.cons_json or "[]", approved=bool(t.approved),
        pros=json.loads(t.pros_json or "[]"),
        cons=json.loads(t.cons_json or "[]"),
    )


@router.post("/saved", status_code=201)
async def save_tool(
    req: SaveRequest,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
) -> dict:
    """Save a tool to the current user's personal list."""
    dup = await db.execute(
        select(SavedTool).where(
            SavedTool.user_id == user.id, SavedTool.tool_id == req.tool_id
        )
    )
    if dup.scalar_one_or_none():
        raise HTTPException(status_code=409, detail="Tool already saved")
    db.add(SavedTool(user_id=user.id, tool_id=req.tool_id))
    await db.commit()
    return {"message": "Tool saved", "tool_id": req.tool_id}


@router.delete("/saved/{tool_id}")
async def unsave_tool(
    tool_id: int,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
) -> dict:
    """Remove a tool from the current user's saved list."""
    result = await db.execute(
        select(SavedTool).where(
            SavedTool.user_id == user.id, SavedTool.tool_id == tool_id
        )
    )
    st = result.scalar_one_or_none()
    if not st:
        raise HTTPException(status_code=404, detail="Tool not in saved list")
    await db.delete(st)
    await db.commit()
    return {"message": "Tool removed", "tool_id": tool_id}


@router.get("/saved", response_model=List[ToolOut])
async def get_saved(
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
) -> List[ToolOut]:
    """Return all tools saved by the current user."""
    result = await db.execute(
        select(Tool)
        .join(SavedTool, SavedTool.tool_id == Tool.id)
        .where(SavedTool.user_id == user.id)
    )
    return [_to_out(t) for t in result.scalars().all()]
