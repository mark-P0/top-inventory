from uuid import uuid4

from pydantic import BaseModel


class ItemType(BaseModel):
    id: str

    name: str


sample_item_types = [
    ItemType(
        id=str(uuid4()),
        name=f"Item Type {idx}",
    )
    for idx in range(16)
]
