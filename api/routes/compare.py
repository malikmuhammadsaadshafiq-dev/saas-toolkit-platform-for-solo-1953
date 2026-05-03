"""Compare endpoint: side-by-side feature matrix for 2–5 tools."""
from __future__ import annotations
import json
from typing import Any, Dict, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models import Tool
from schemas import CompareRequest

router = APIRouter(tags=["compare"])

_FIELDS = ["name", "category", "pricing_tier", "stage_fit", "website_url", "affiliate_url"]


@router.post("/compare")
async def compare_tools(
    body: CompareRequest,
    db: AsyncSession = Depends(get_db),
) -> Dict[str, Any]:
    """
    Return a side-by-side feature matrix for the requested tools.
    Provide 2–5 tool IDs. Response shape:
      { tools: [name, …], matrix: { field: { toolName: value, … }, … } }
    """
    if len(body.tool_ids) < 2:
        raise HTTPException(status_code=400, detail="Provide at least 2 tool_ids")
    if len(body.tool_ids) > 5:
        raise HTTPException(status_code=400, detail="Maximum 5 tools can be compared")

    result = await db.execute(select(Tool).where(Tool.id.in_(body.tool_ids)))
    tools: List[Tool] = result.scalars().all()

    if len(tools) != len(body.tool_ids):
        raise HTTPException(status_code=404, detail="One or more tools not found")

    matrix: Dict[str, Any] = {}
    for field in _FIELDS:
        matrix[field] = {t.name: getattr(t, field) or "" for t in tools}

    matrix["pros"] = {t.name: json.loads(t.pros_json or "[]") for t in tools}
    matrix["cons"] = {t.name: json.loads(t.cons_json or "[]") for t in tools}

    return {
        "tools": [t.name for t in tools],
        "tool_ids": [t.id for t in tools],
        "matrix": matrix,
    }
