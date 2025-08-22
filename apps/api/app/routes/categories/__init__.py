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
    def generate_categories():
        categories = DBCategory.get_all(
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
                items=[],
            )

    return GetCategoriesResponse(
        data=[*generate_categories()],
    )
