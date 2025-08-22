from typing import TypedDict
from uuid import UUID, uuid4

from sqlmodel import Field, SQLModel, select

from app.db import SessionDependency


class Category(SQLModel, table=True):
    id: int = Field(primary_key=True)
    uuid: UUID = Field(index=True, unique=True, default_factory=uuid4)
    name_id: str = Field(index=True, unique=True)

    name: str

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
