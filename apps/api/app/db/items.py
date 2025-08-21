from uuid import UUID, uuid4

from sqlmodel import Field, SQLModel


class Item(SQLModel, table=True):
    id: int = Field(primary_key=True)
    uuid: UUID = Field(index=True, unique=True, default_factory=uuid4)

    category_id: int = Field(index=True, unique=True)
    item_type_id: int = Field(index=True, unique=True)

    name: str
