from uuid import uuid4

from pydantic import BaseModel


class Category(BaseModel):
    id: str
    name_id: str

    name: str


sample_categories = [
    Category(
        id=str(uuid4()),
        name_id=f"category-{idx}",
        name=f"Category {idx}",
    )
    for idx in range(8)
]
