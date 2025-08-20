from uuid import uuid4

from pydantic import BaseModel


class ItemType(BaseModel):
    id: int
    uuid: str

    name: str


sample_item_types = [
    ItemType(
        id=idx,
        uuid=str(uuid4()),
        name=f"Item Type {idx}",
    )
    for idx in range(16)
]


def get_item_type_by_id(id: int):
    for item_type in sample_item_types:
        if item_type.id == id:
            return item_type

    raise ValueError("Item type not found")
