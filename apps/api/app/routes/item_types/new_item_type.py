from typing import ClassVar

from fastapi import status
from pydantic import BaseModel, Field

from app.db import SessionDependency
from app.db.categories import GetAllCategoriesFilter, get_all_categories
from app.db.item_types import create_item_type
from app.db.items import create_items
from app.lib.fastapi.responses import ErrorResponse, create_responses_dict_from_models


class RequestBody(BaseModel):
    item_type_name: str
    item_ct: int = Field(ge=1, le=8)
    category_name_id: str


class ResponseBody(BaseModel):
    success: bool = True


class NonExistentCategoryErrorResponse(ErrorResponse):
    status_code: int = status.HTTP_404_NOT_FOUND
    title: ClassVar[str] = "Non-Existent Category"
    message: str = "Category does not exist"


class ExistingItemTypeErrorResponse(ErrorResponse):
    status_code: int = status.HTTP_409_CONFLICT
    title: ClassVar[str] = "Existing Item Type"
    message: str = "Item type already exists"


class NotCreatedItemTypeErrorResponse(ErrorResponse):
    status_code: int = status.HTTP_409_CONFLICT
    title: ClassVar[str] = "Not Created Item Type"
    message: str = "Item type not created?"


class NotCreatedItemsErrorResponse(ErrorResponse):
    status_code: int = status.HTTP_409_CONFLICT
    title: ClassVar[str] = "Not Created Items"
    message: str = "Items not created?"


new_item_type_responses = create_responses_dict_from_models(
    NonExistentCategoryErrorResponse,
    ExistingItemTypeErrorResponse,
    NotCreatedItemTypeErrorResponse,
    NotCreatedItemsErrorResponse,
)


def new_item_type(
    session: SessionDependency,
    body: RequestBody,
) -> ResponseBody:
    ## Find requested category
    categories = get_all_categories(
        session,
        filter=GetAllCategoriesFilter(
            name_id=body.category_name_id,
        ),
    )
    if len(categories) != 1:
        raise NonExistentCategoryErrorResponse.as_http_exception()

    category = categories[0]
    category_id = category.id
    if category_id is None:
        raise NonExistentCategoryErrorResponse.as_http_exception()

    ## Create item type
    result = create_item_type(
        session,
        name=body.item_type_name,
    )
    if result.error == "ITEM_TYPE_EXISTING":
        raise ExistingItemTypeErrorResponse.as_http_exception()

    item_type = result.data
    if item_type is None:
        raise NotCreatedItemTypeErrorResponse.as_http_exception()

    item_type_id = item_type.id
    if item_type_id is None:
        raise NotCreatedItemTypeErrorResponse.as_http_exception()

    ## Create items
    items = create_items(
        session,
        ct=body.item_ct,
        name=body.item_type_name,  # Field unnecessary; can be removed from DB
        category_id=category_id,
        item_type_id=item_type_id,
    )

    if len(items) == 0:
        raise NotCreatedItemsErrorResponse.as_http_exception()

    return ResponseBody()
