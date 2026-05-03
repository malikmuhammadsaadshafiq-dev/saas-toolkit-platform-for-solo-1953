"""Stacks endpoints: list all stacks and get a single stack with its tools."""
from __future__ import annotations
import json
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from database import get_db
from models import Stack, StackTool
from schemas import StackOut, StackToolOut, ToolOut

router = APIRouter(tags=["stacks"])


def _tool_out(t) -> ToolOut:
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


def _stack_out(s: Stack) -> StackOut:
    tools = [
        StackToolOut(role=st.role or "", tool=_tool_out(st.tool))
        for st in s.stack_tools
    ]
    return StackOut(
        id=s.id, slug=s.slug, name=s.name,
        description=s.description or "", persona=s.persona or "",
        tools=tools,
    )


def _eager_stmt(extra=None):
    stmt = select(Stack).options(
        selectinload(Stack.stack_tools).selectinload(StackTool.tool)
    )
    return stmt if extra is None else stmt.where(extra)


@router.get("/stacks", response_model=List[StackOut])
async def list_stacks(db: AsyncSession = Depends(get_db)) -> List[StackOut]:
    result = await db.execute(_eager_stmt())
    return [_stack_out(s) for s in result.scalars().all()]


@router.get("/stacks/{slug}", response_model=StackOut)
async def get_stack(slug: str, db: AsyncSession = Depends(get_db)) -> StackOut:
    result = await db.execute(_eager_stmt(Stack.slug == slug))
    s = result.scalar_one_or_none()
    if not s:
        raise HTTPException(status_code=404, detail="Stack not found")
    return _stack_out(s)
