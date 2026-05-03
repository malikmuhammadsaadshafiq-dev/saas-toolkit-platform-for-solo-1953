"""Tools endpoints: list, get, and submit tools."""
from __future__ import annotations
import json
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from auth import get_current_user
from database import get_db
from models import Submission, Tool, User
from schemas import ToolCreate, ToolOut

router = APIRouter(tags=["tools"])


def _to_out(t: Tool) -> ToolOut:
    return ToolOut(
        id=t.id, slug=t.slug, name=t.name, tagline=t.tagline or "",
        description=t.description or "", category=t.category,
        pricing_tier=t.pricing_tier or "freemium", stage_fit=t.stage_fit or "",
        website_url=t.website_url or "", affiliate_url=t.affiliate_url or "",
        logo_url=t.logo_url or "", pros_json=t.pros_json or "[]",
        cons_json=t.cons_json or "[]", approved=bool(t.approved),
        pros=json.loads(t.pros_json or "[]"),
        cons=json.loads(t.cons_json or "[]"),
    )


@router.get("/tools", response_model=List[ToolOut])
async def list_tools(
    category: Optional[str] = Query(None, description="Filter by category slug"),
    pricing: Optional[str] = Query(None, description="free|freemium|paid|open-source"),
    stage: Optional[str] = Query(None, description="idea|mvp|growth|scale"),
    q: Optional[str] = Query(None, description="Search name/tagline"),
    db: AsyncSession = Depends(get_db),
) -> List[ToolOut]:
    stmt = select(Tool).where(Tool.approved.is_(True))
    if category:
        stmt = stmt.where(Tool.category == category)
    if pricing:
        stmt = stmt.where(Tool.pricing_tier == pricing)
    if stage:
        stmt = stmt.where(Tool.stage_fit.contains(stage))
    if q:
        like = f"%{q}%"
        stmt = stmt.where((Tool.name.ilike(like)) | (Tool.tagline.ilike(like)))
    result = await db.execute(stmt)
    return [_to_out(t) for t in result.scalars().all()]


@router.get("/tools/{slug}", response_model=ToolOut)
async def get_tool(slug: str, db: AsyncSession = Depends(get_db)) -> ToolOut:
    result = await db.execute(select(Tool).where(Tool.slug == slug))
    tool = result.scalar_one_or_none()
    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")
    return _to_out(tool)


@router.post("/tools", response_model=ToolOut, status_code=201)
async def submit_tool(
    data: ToolCreate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
) -> ToolOut:
    """Submit a new tool for review (requires auth). Approval is manual."""
    tool = Tool(**data.model_dump(), submitted_by=user.id, approved=False)
    db.add(tool)
    await db.flush()
    db.add(Submission(tool_id=tool.id, status="pending"))
    await db.commit()
    return _to_out(tool)
