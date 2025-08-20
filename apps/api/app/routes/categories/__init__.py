from fastapi import APIRouter

from app.db.categories import sample_categories
from app.db.items import sample_items
from app.routes.categories.validations import (
    GetCategoriesQuery,
    GetCategoriesResponse,
    PublicCategory,
)

CategoriesRouter = APIRouter(prefix="/categories")


@CategoriesRouter.get("/")
def get_categories(query: GetCategoriesQuery) -> GetCategoriesResponse:
    def generate_response_data():
        for category in sample_categories:
            has_name_id_filter = query.filter_name_id is not None
            is_name_id_filter_match = query.filter_name_id == category.name_id
            if has_name_id_filter and not is_name_id_filter_match:
                continue

            category_items = [
                item for item in sample_items if item.category_id == category.id
            ]
            category_item_types = set(item.item_type_id for item in category_items)

            item_type_ct = (
                len(category_item_types) if query.include_item_type_ct else None
            )
            total_item_ct = len(category_items) if query.include_total_item_ct else None

            yield PublicCategory(
                name_id=category.name_id,
                name=category.name,
                item_type_ct=item_type_ct,
                total_item_ct=total_item_ct,
            )

    return GetCategoriesResponse(data=[*generate_response_data()])
