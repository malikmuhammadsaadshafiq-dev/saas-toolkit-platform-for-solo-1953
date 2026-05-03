"""Seed the database with curated tools and starter stacks."""
from __future__ import annotations

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from models import Stack, StackTool, Tool
from seed_tools import TOOLS
from seed_stacks import STACKS


async def seed_db(db: AsyncSession) -> None:
    """Idempotent seed — skips if tools already exist."""
    count_result = await db.execute(select(func.count()).select_from(Tool))
    if (count_result.scalar() or 0) > 0:
        return

    # ── Insert tools ─────────────────────────────────────────────────────────
    tool_map: dict[str, Tool] = {}
    for slug, name, tagline, cat, pricing, stage, url, pros, cons in TOOLS:
        t = Tool(
            slug=slug,
            name=name,
            tagline=tagline,
            description=f"{name} — {tagline}",
            category=cat,
            pricing_tier=pricing,
            stage_fit=stage,
            website_url=url,
            pros_json=pros,
            cons_json=cons,
            approved=True,
        )
        db.add(t)
        tool_map[slug] = t

    await db.flush()  # assign IDs before building relationships

    # ── Insert stacks ─────────────────────────────────────────────────────────
    for slug, name, desc, persona, stack_tools in STACKS:
        s = Stack(slug=slug, name=name, description=desc, persona=persona)
        db.add(s)
        await db.flush()

        for tool_slug, role in stack_tools:
            if tool_slug in tool_map:
                db.add(
                    StackTool(
                        stack_id=s.id,
                        tool_id=tool_map[tool_slug].id,
                        role=role,
                    )
                )

    await db.commit()
