from fastapi import APIRouter

from app.db import SessionDependency
from app.db.categories import DBCategory
from app.routes.categories.validations import (
    GetCategoriesQuery,
    GetCategoriesResponse,
    PublicCategory,
)

CategoriesRouter = APIRouter(prefix="/categories")


@CategoriesRouter.get("/")
def get_categories(
    session: SessionDependency,
    query: GetCategoriesQuery,
) -> GetCategoriesResponse:
    categories = DBCategory.get_all(
        session,
        filter={
            "name_id": query.filter_name_id,
        },
    )

    return GetCategoriesResponse(
        data=[
            PublicCategory(
                uuid=str(category.uuid),
                name_id=category.name_id,
                name=category.name,
                items=[],
            )
            for category in categories
        ],
    )
