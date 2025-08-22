from uuid import UUID, uuid4

from sqlmodel import Field, SQLModel


class ItemType(SQLModel, table=True):
    id: int = Field(primary_key=True)
    uuid: UUID = Field(unique=True, default_factory=uuid4)

    name: str
