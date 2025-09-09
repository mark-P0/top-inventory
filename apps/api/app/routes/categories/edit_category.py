from typing import ClassVar

from fastapi import status
from pydantic import BaseModel

from app.core.dependencies.mutation_token import MutationTokenDependency
from app.db import SessionDependency
from app.db.categories import EditCategoryData, update_category
from app.lib.fastapi.responses import ErrorResponse, create_responses_dict_from_models
from app.routes.categories.validations import PublicCategory


class RequestBody(BaseModel):
    category_name: str | None = None


class ResponseBody(BaseModel):
    data: PublicCategory


class NonExistentCategoryErrorResponse(ErrorResponse):
    status_code: int = status.HTTP_404_NOT_FOUND
    title: ClassVar[str] = "Non-Existent Category"
    message: str = "Category does not exist"


class NotUpdatedCategoryErrorResponse(ErrorResponse):
    status_code: int = status.HTTP_502_BAD_GATEWAY
    title: ClassVar[str] = "Not Updated Category"
    message: str = "Category not updated?"


edit_category_responses = create_responses_dict_from_models(
    NonExistentCategoryErrorResponse,
    NotUpdatedCategoryErrorResponse,
)


def edit_category(
    session: SessionDependency,
    _: MutationTokenDependency,
    uuid: str,
    body: RequestBody,
) -> ResponseBody:
    result = update_category(
        session,
        uuid=uuid,
        data=EditCategoryData(
            name=body.category_name,
        ),
    )
    if result.error == "CATEGORY_NOT_EXISTING":
        raise NonExistentCategoryErrorResponse.as_http_exception()

    category = result.data
    if category is None:
        raise NotUpdatedCategoryErrorResponse.as_http_exception()

    return ResponseBody(
        data=PublicCategory.from_db(
            category,
            with_items=True,
        ),
    )
