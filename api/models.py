"""SQLAlchemy ORM models for the SaaS Toolkit Platform."""
from __future__ import annotations
from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from database import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    saved_tools = relationship("SavedTool", back_populates="user")


class Tool(Base):
    __tablename__ = "tools"
    id = Column(Integer, primary_key=True)
    slug = Column(String, unique=True, nullable=False, index=True)
    name = Column(String, nullable=False)
    tagline = Column(String, default="")
    description = Column(Text, default="")
    category = Column(String, nullable=False, index=True)
    pricing_tier = Column(String, default="freemium", index=True)  # free/freemium/paid/open-source
    stage_fit = Column(String, default="")   # csv: idea,mvp,growth,scale
    website_url = Column(String, default="")
    affiliate_url = Column(String, default="")
    logo_url = Column(String, default="")
    pros_json = Column(Text, default="[]")   # JSON array
    cons_json = Column(Text, default="[]")   # JSON array
    submitted_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    approved = Column(Boolean, default=True)
    saved_by = relationship("SavedTool", back_populates="tool")


class Stack(Base):
    __tablename__ = "stacks"
    id = Column(Integer, primary_key=True)
    slug = Column(String, unique=True, nullable=False, index=True)
    name = Column(String, nullable=False)
    description = Column(Text, default="")
    persona = Column(String, default="")
    stack_tools = relationship("StackTool", back_populates="stack")


class StackTool(Base):
    __tablename__ = "stack_tools"
    id = Column(Integer, primary_key=True)
    stack_id = Column(Integer, ForeignKey("stacks.id"))
    tool_id = Column(Integer, ForeignKey("tools.id"))
    role = Column(String, default="")
    stack = relationship("Stack", back_populates="stack_tools")
    tool = relationship("Tool")


class SavedTool(Base):
    __tablename__ = "saved_tools"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    tool_id = Column(Integer, ForeignKey("tools.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    user = relationship("User", back_populates="saved_tools")
    tool = relationship("Tool", back_populates="saved_by")


class Submission(Base):
    __tablename__ = "submissions"
    id = Column(Integer, primary_key=True)
    tool_id = Column(Integer, ForeignKey("tools.id"))
    status = Column(String, default="pending")  # pending/approved/rejected
    created_at = Column(DateTime, default=datetime.utcnow)


class MagicToken(Base):
    __tablename__ = "magic_tokens"
    id = Column(Integer, primary_key=True)
    token = Column(String, unique=True, nullable=False, index=True)
    email = Column(String, nullable=False)
    expires_at = Column(DateTime, nullable=False)
    used = Column(Boolean, default=False)
