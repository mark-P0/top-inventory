import random
from uuid import uuid4

from pydantic import BaseModel

from app.db.categories import sample_categories
from app.db.item_types import sample_item_types


class Item(BaseModel):
    id: int
    uuid: str

    category_id: int
    item_type_id: int

    name: str


sample_category_ids = [category.id for category in sample_categories]
sample_item_type_ids = [item_type.id for item_type in sample_item_types]


sample_items = [
    Item(
        id=idx,
        uuid=str(uuid4()),
        category_id=random.choice(sample_category_ids),
        item_type_id=random.choice(sample_item_type_ids),
        name=f"Item {idx}",
    )
    for idx in range(32)
]
