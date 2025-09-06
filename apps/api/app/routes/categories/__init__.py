from fastapi import APIRouter

from app.db import SessionDependency
from app.db.categories import (
    EditCategoryData,
    GetAllCategoriesFilter,
    create_category,
    delete_category,
    get_all_categories,
    update_category,
)
from app.lib.fastapi.responses import create_responses_dict_from_models
from app.routes.categories.validations import (
    EditCategoryBody,
    EditCategoryNotExistingResponse,
    EditCategoryNotUpdatedResponse,
    EditCategoryResponse,
    GetCategoriesQuery,
    GetCategoriesResponse,
    NewCategoryAlreadyExistsResponse,
    NewCategoryBody,
    NewCategoryNotCreatedResponse,
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
        filter=GetAllCategoriesFilter(
            name_id=query.filter_name_id,
        ),
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


@CategoriesRouter.post(
    "/",
    responses=create_responses_dict_from_models(
        NewCategoryAlreadyExistsResponse,
        NewCategoryNotCreatedResponse,
    ),
)
def new_category(
    session: SessionDependency,
    body: NewCategoryBody,
) -> NewCategoryResponse:
    result = create_category(
        session,
        category_name=body.category_name,
    )
    if result.error == "CATEGORY_ALREADY_EXISTING":
        raise NewCategoryAlreadyExistsResponse.as_http_exception()

    category = result.data
    if category is None:
        raise NewCategoryNotCreatedResponse.as_http_exception()

    return NewCategoryResponse(
        data=PublicCategory.from_db(
            category,
            with_items=False,
        ),
    )


@CategoriesRouter.patch(
    "/{uuid}",
    responses=create_responses_dict_from_models(
        EditCategoryNotExistingResponse,
        EditCategoryNotUpdatedResponse,
    ),
)
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
        raise EditCategoryNotExistingResponse.as_http_exception()

    category = result.data
    if category is None:
        raise EditCategoryNotUpdatedResponse.as_http_exception()

    return EditCategoryResponse(
        data=PublicCategory.from_db(
            category,
            with_items=True,
        ),
    )


@CategoriesRouter.delete("/{uuid}")
def remove_category(
    session: SessionDependency,
    uuid: str,
):
    delete_category(
        session,
        uuid=uuid,
    )

    return dict(
        data=True,
    )
