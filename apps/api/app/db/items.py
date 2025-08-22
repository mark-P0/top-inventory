from uuid import UUID, uuid4

from sqlmodel import Field, Relationship, SQLModel

from app.db.item_types import ItemType


class Item(SQLModel, table=True):
    id: int = Field(primary_key=True)
    uuid: UUID = Field(unique=True, default_factory=uuid4)

    category_id: int = Field(foreign_key="category.id")
    item_type_id: int = Field(foreign_key="itemtype.id")

    name: str

    item_type: ItemType = Relationship()
