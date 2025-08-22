from uuid import UUID, uuid4

from sqlmodel import Field, SQLModel


class Item(SQLModel, table=True):
    id: int = Field(primary_key=True)
    uuid: UUID = Field(unique=True, default_factory=uuid4)

    category_id: UUID = Field(index=True)
    item_type_id: UUID = Field(index=True)

    name: str
