from random import randint

from fastapi import APIRouter

from app.db.categories import sample_categories
from app.routes.categories.validations import (
    GetCategoriesQuery,
    GetCategoriesResponse,
    PublicCategory,
)

CategoriesRouter = APIRouter(prefix="/categories")


@CategoriesRouter.get("/")
def get_categories(query: GetCategoriesQuery) -> GetCategoriesResponse:
    data = [
        PublicCategory(
            name_id=category.name_id,
            name=category.name,
            item_type_ct=randint(0, 32) if query.include_item_type_ct else None,
            total_item_ct=randint(0, 32) if query.include_total_item_ct else None,
        )
        for category in sample_categories
    ]

    return GetCategoriesResponse(data=data)
