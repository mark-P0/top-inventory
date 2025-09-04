from datetime import datetime
from uuid import UUID, uuid4

from sqlmodel import Field, Relationship, SQLModel

from app.lib.sqlmodel.timestamps import created_at_field, updated_at_field


class ItemType(SQLModel, table=True):
    id: int | None = Field(primary_key=True, default=None)
    uuid: UUID = Field(unique=True, default_factory=uuid4)

    name: str

    created_at: datetime = created_at_field()
    updated_at: datetime = updated_at_field()


class Item(SQLModel, table=True):
    id: int | None = Field(primary_key=True, default=None)
    uuid: UUID = Field(unique=True, default_factory=uuid4)

    category_id: int = Field(foreign_key="category.id")
    item_type_id: int = Field(foreign_key="itemtype.id")

    name: str

    item_type: ItemType = Relationship()

    created_at: datetime = created_at_field()
    updated_at: datetime = updated_at_field()


class Category(SQLModel, table=True):
    id: int | None = Field(primary_key=True, default=None)
    uuid: UUID = Field(unique=True, default_factory=uuid4)
    name_id: str = Field(unique=True)

    name: str

    items: list["Item"] = Relationship()

    created_at: datetime = created_at_field()
    updated_at: datetime = updated_at_field()
