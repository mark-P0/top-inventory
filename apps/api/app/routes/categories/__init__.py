from fastapi import APIRouter

from app.db import SessionDependency
from app.db.models import Category
from app.routes.categories.validations import (
    GetCategoriesQuery,
    GetCategoriesResponse,
    PublicCategory,
    PublicCategoryItem,
    PublicCategoryItemType,
)

CategoriesRouter = APIRouter(prefix="/categories")


@CategoriesRouter.get("/")
def get_categories(
    session: SessionDependency,
    query: GetCategoriesQuery,
) -> GetCategoriesResponse:
    def generate_items(category: Category):
        if not query.include_items:
            return

        for item in category.items:
            yield PublicCategoryItem(
                uuid=str(item.uuid),
                name=item.name,
                item_type=PublicCategoryItemType(
                    uuid=str(item.item_type.uuid),
                    name=item.item_type.name,
                ),
            )

    def generate_categories():
        categories = Category.get_all(
            session,
            filter={
                "name_id": query.filter_name_id,
            },
        )

        for category in categories:
            yield PublicCategory(
                uuid=str(category.uuid),
                name_id=category.name_id,
                name=category.name,
                items=[*generate_items(category)],
            )

    return GetCategoriesResponse(
        data=[*generate_categories()],
    )
