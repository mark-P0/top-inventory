from typing import Literal

from pydantic import BaseModel
from sqlmodel import select

from app.core.dependencies.db import SessionDependency
from app.db.models import ItemType


class CreateItemTypeResult(BaseModel):
    success: bool
    error: None | Literal["ITEM_TYPE_EXISTING"] = None
    data: "None | ItemType" = None


def create_item_type(
    session: SessionDependency,
    /,
    name: str,
) -> CreateItemTypeResult:
    existing_item_type = session.exec(
        select(ItemType).where(ItemType.name == name),
    ).one_or_none()
    if existing_item_type is not None:
        return CreateItemTypeResult(
            success=False,
            error="ITEM_TYPE_EXISTING",
        )

    item_type = ItemType(
        name=name,
    )

    session.add(item_type)
    session.commit()

    return CreateItemTypeResult(
        success=True,
        data=item_type,
    )
