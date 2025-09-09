from app.core.dependencies.db import SessionDependency
from app.db.models import Item


def create_items(
    session: SessionDependency,
    /,
    ct: int,
    name: str,
    category_id: int,
    item_type_id: int,
):
    items = [
        Item(
            name=name,
            category_id=category_id,
            item_type_id=item_type_id,
        )
        for _ in range(ct)
    ]

    for item in items:
        session.add(item)

    session.commit()

    return items
