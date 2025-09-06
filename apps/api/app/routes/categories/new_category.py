from typing import ClassVar

from fastapi import status
from pydantic import BaseModel

from app.db import SessionDependency
from app.db.categories import create_category
from app.lib.fastapi.responses import ErrorResponse, create_responses_dict_from_models
from app.routes.categories.validations import PublicCategory


class RequestBody(BaseModel):
    category_name: str


class ResponseBody(BaseModel):
    data: PublicCategory


class ExistingCategoryErrorResponse(ErrorResponse):
    status_code: int = status.HTTP_409_CONFLICT
    title: ClassVar[str] = "Existing Category"
    message: str = "Category already exists"


class NotCreatedCategoryErrorResponse(ErrorResponse):
    status_code: int = status.HTTP_502_BAD_GATEWAY
    title: ClassVar[str] = "Not Created Category"
    message: str = "Category not created?"


new_category_responses = create_responses_dict_from_models(
    ExistingCategoryErrorResponse,
    NotCreatedCategoryErrorResponse,
)


def new_category(
    session: SessionDependency,
    body: RequestBody,
) -> ResponseBody:
    result = create_category(
        session,
        category_name=body.category_name,
    )
    if result.error == "CATEGORY_ALREADY_EXISTING":
        raise ExistingCategoryErrorResponse.as_http_exception()

    category = result.data
    if category is None:
        raise NotCreatedCategoryErrorResponse.as_http_exception()

    return ResponseBody(
        data=PublicCategory.from_db(
            category,
            with_items=False,
        ),
    )
