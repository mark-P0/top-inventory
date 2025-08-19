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
    def generate_data_response():
        for category in sample_categories:
            item_type_ct = randint(0, 32) if query.include_item_type_ct else None
            total_item_ct = randint(0, 32) if query.include_total_item_ct else None

            yield PublicCategory(
                name_id=category.name_id,
                name=category.name,
                item_type_ct=item_type_ct,
                total_item_ct=total_item_ct,
            )

    return GetCategoriesResponse(data=[*generate_data_response()])
