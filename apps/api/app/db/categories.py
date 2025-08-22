from typing import TYPE_CHECKING, TypedDict
from uuid import UUID, uuid4

from sqlmodel import Field, Relationship, SQLModel, select

from app.db import SessionDependency

if TYPE_CHECKING:
    """
    https://sqlmodel.tiangolo.com/tutorial/code-structure/#import-only-while-editing-with-type_checking
    """

    from app.db.items import Item


class Category(SQLModel, table=True):
    id: int = Field(primary_key=True)
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
