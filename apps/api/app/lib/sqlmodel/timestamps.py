"""
From ChatGPT

Must assign `datetime` type hint manually
"""

from datetime import datetime

from sqlalchemy import DateTime, sql
from sqlmodel import Column, Field


def created_at_field() -> datetime:
    return Field(
        sa_column=Column(
            DateTime(timezone=True),
            nullable=False,
            server_default=sql.func.now(),
        ),
    )


def updated_at_field() -> datetime:
    return Field(
        sa_column=Column(
            DateTime(timezone=True),
            nullable=False,
            server_default=sql.func.now(),
            onupdate=sql.func.now(),
        ),
    )


def deleted_at_field() -> datetime:
    return Field(
        sa_column=Column(
            DateTime(timezone=True),
            default=None,
        ),
    )
