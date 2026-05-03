"""Pydantic v2 request / response schemas."""
from __future__ import annotations
from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


# ── Tool ─────────────────────────────────────────────────────────────────────

class ToolCreate(BaseModel):
    slug: str
    name: str
    tagline: str = ""
    description: str = ""
    category: str
    pricing_tier: str = "freemium"
    stage_fit: str = "idea,mvp"
    website_url: str = ""
    affiliate_url: str = ""
    logo_url: str = ""
    pros_json: str = "[]"
    cons_json: str = "[]"


class ToolOut(BaseModel):
    id: int
    slug: str
    name: str
    tagline: str = ""
    description: str = ""
    category: str
    pricing_tier: str = ""
    stage_fit: str = ""
    website_url: str = ""
    affiliate_url: str = ""
    logo_url: str = ""
    pros_json: str = "[]"
    cons_json: str = "[]"
    approved: bool = True
    pros: List[str] = []
    cons: List[str] = []

    model_config = {"from_attributes": True}


# ── Stack ─────────────────────────────────────────────────────────────────────

class StackToolOut(BaseModel):
    role: str
    tool: ToolOut

    model_config = {"from_attributes": True}


class StackOut(BaseModel):
    id: int
    slug: str
    name: str
    description: str = ""
    persona: str = ""
    tools: List[StackToolOut] = []

    model_config = {"from_attributes": True}


# ── Auth ─────────────────────────────────────────────────────────────────────

class MagicLinkRequest(BaseModel):
    email: str


class VerifyRequest(BaseModel):
    token: str


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"


# ── User ─────────────────────────────────────────────────────────────────────

class UserOut(BaseModel):
    id: int
    email: str
    created_at: datetime

    model_config = {"from_attributes": True}


# ── Saved / Compare ───────────────────────────────────────────────────────────

class SaveRequest(BaseModel):
    tool_id: int


class CompareRequest(BaseModel):
    tool_ids: List[int]
