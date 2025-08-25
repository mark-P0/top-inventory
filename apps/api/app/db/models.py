from typing import TypedDict
from uuid import UUID, uuid4

from sqlmodel import Field, Relationship, SQLModel, select

from app.db import SessionDependency


class ItemType(SQLModel, table=True):
    id: int | None = Field(primary_key=True, default=None)
    uuid: UUID = Field(unique=True, default_factory=uuid4)

    name: str


class Item(SQLModel, table=True):
    id: int | None = Field(primary_key=True, default=None)
    uuid: UUID = Field(unique=True, default_factory=uuid4)

    category_id: int = Field(foreign_key="category.id")
    item_type_id: int = Field(foreign_key="itemtype.id")

    name: str

    item_type: ItemType = Relationship()


class Category(SQLModel, table=True):
    id: int | None = Field(primary_key=True, default=None)
    uuid: UUID = Field(unique=True, default_factory=uuid4)
    name_id: str = Field(unique=True)

    name: str

    items: list["Item"] = Relationship()

    ...  # Non-model fields below

    class GetAllFilter(TypedDict):
        name_id: str | None

    @staticmethod
    def get_all(session: SessionDependency, /, filter: GetAllFilter):
        statement = select(Category)
        if filter["name_id"] is not None:
            statement = statement.where(Category.name_id == filter["name_id"])

        result = session.exec(statement).all()

        return result
