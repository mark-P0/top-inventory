from fastapi import APIRouter, HTTPException, status

from app.db import SessionDependency
from app.db.categories import (
    EditCategoryData,
    create_category,
    get_all_categories,
    update_category,
)
from app.routes.categories.validations import (
    EditCategoryBody,
    EditCategoryResponse,
    GetCategoriesQuery,
    GetCategoriesResponse,
    NewCategoryBody,
    NewCategoryResponse,
    PublicCategory,
)

CategoriesRouter = APIRouter(prefix="/categories")


@CategoriesRouter.get("/")
def get_categories(
    session: SessionDependency,
    query: GetCategoriesQuery,
) -> GetCategoriesResponse:
    db_categories = get_all_categories(
        session,
        filter={
            "name_id": query.filter_name_id,
        },
    )

    public_categories = [
        PublicCategory.from_db(
            category,
            with_items=query.include_items,
        )
        for category in db_categories
    ]

    return GetCategoriesResponse(
        data=public_categories,
    )


@CategoriesRouter.post("/")
def new_category(
    session: SessionDependency,
    body: NewCategoryBody,
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
        data=PublicCategory.from_db(
            category,
            with_items=False,
        ),
    )


@CategoriesRouter.patch("/{uuid}")
def edit_category(
    session: SessionDependency,
    uuid: str,
    body: EditCategoryBody,
) -> EditCategoryResponse:
    result = update_category(
        session,
        uuid=uuid,
        data=EditCategoryData(
            name=body.category_name,
        ),
    )
    if result.error == "CATEGORY_NOT_EXISTING":
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category does not exist",
        )

    category = result.data
    if category is None:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Category not updated?",
        )

    return EditCategoryResponse(
        data=PublicCategory.from_db(
            category,
            with_items=True,
        ),
    )
