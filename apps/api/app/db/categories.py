from uuid import UUID, uuid4

from sqlmodel import Field, SQLModel, select

from app.db import SessionDependency


class Category(SQLModel, table=True):
    id: int = Field(primary_key=True)
    uuid: UUID = Field(index=True, unique=True, default_factory=uuid4)
    name_id: str = Field(index=True, unique=True)

    name: str


class DBCategory:
    @classmethod
    def get_all(cls, *, session: SessionDependency):
        statement = select(Category)
        result = session.exec(statement).all()

        return result
