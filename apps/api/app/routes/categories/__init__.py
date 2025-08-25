from fastapi import APIRouter, HTTPException, status

from app.db import SessionDependency
from app.db.categories import create_category, get_all_categories
from app.db.models import Category
from app.routes.categories.validations import (
    GetCategoriesQuery,
    GetCategoriesResponse,
    NewCategoryBody,
    NewCategoryResponse,
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
        categories = get_all_categories(
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


@CategoriesRouter.post("/")
def new_category(
    session: SessionDependency, body: NewCategoryBody
) -> NewCategoryResponse:
    result = create_category(
        session,
        category_name=body.category_name,
    )
    if result.error == "CATEGORY_ALREADY_EXISTING":
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Category already exists",
        )

    category = result.data
    if category is None:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Category not created?",
        )

    return NewCategoryResponse(
        data=PublicCategory(
            uuid=str(category.uuid),
            name_id=category.name_id,
            name=category.name,
            items=[],
        ),
    )
