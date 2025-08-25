from typing import Literal, TypedDict
from uuid import UUID, uuid4

from pydantic import BaseModel
from pydash import kebab_case
from sqlmodel import Field, Relationship, SQLModel, or_, select

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

    class AddCategoryResult(BaseModel):
        success: bool
        error: None | Literal["CATEGORY_ALREADY_EXISTING"] = None
        data: "None | Category" = None

    @classmethod
    def get_all(cls, session: SessionDependency, /, filter: GetAllFilter):
        statement = select(Category)
        if filter["name_id"] is not None:
            statement = statement.where(Category.name_id == filter["name_id"])

        result = session.exec(statement).all()

        return result

    @classmethod
    def add(
        cls, session: SessionDependency, /, category_name: str
    ) -> AddCategoryResult:
        name_id = kebab_case(category_name)

        existing_category = session.exec(
            select(Category).where(
                or_(
                    Category.name == category_name,
                    Category.name_id == name_id,
                )
            )
        ).one_or_none()
        if existing_category is not None:
            return Category.AddCategoryResult(
                success=False,
                error="CATEGORY_ALREADY_EXISTING",
            )

        category = Category(
            name=category_name,
            name_id=name_id,
        )

        session.add(category)
        session.commit()

        return Category.AddCategoryResult(
            success=True,
            data=category,
        )
