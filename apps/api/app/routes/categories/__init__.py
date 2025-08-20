from fastapi import APIRouter

from app.db.categories import sample_categories
from app.db.item_types import get_item_type_by_id
from app.db.items import sample_items
from app.routes.categories.validations import (
    GetCategoriesQuery,
    GetCategoriesResponse,
    PublicCategory,
    PublicCategoryItem,
    PublicCategoryItemType,
)

CategoriesRouter = APIRouter(prefix="/categories")


@CategoriesRouter.get("/")
def get_categories(query: GetCategoriesQuery) -> GetCategoriesResponse:
    def generate_response_items(category_id: int):
        if not query.include_items:
            return

        for item in sample_items:
            if item.category_id != category_id:
                continue

            item_type = get_item_type_by_id(item.item_type_id)

            yield PublicCategoryItem(
                uuid=item.uuid,
                name=item.name,
                item_type=PublicCategoryItemType(
                    uuid=item_type.uuid,
                    name=item_type.name,
                ),
            )

    def generate_response_categories():
        for category in sample_categories:
            has_name_id_filter = query.filter_name_id is not None
            is_name_id_filter_match = query.filter_name_id == category.name_id
            if has_name_id_filter and not is_name_id_filter_match:
                continue

            yield PublicCategory(
                uuid=category.uuid,
                name_id=category.name_id,
                name=category.name,
                items=[*generate_response_items(category.id)],
            )

    return GetCategoriesResponse(
        data=[*generate_response_categories()],
    )
