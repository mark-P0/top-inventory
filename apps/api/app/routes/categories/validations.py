from typing import Annotated

from fastapi import Query
from pydantic import BaseModel


class PublicCategoryItemType(BaseModel):
    uuid: str

    name: str


class PublicCategoryItem(BaseModel):
    uuid: str

    name: str
    item_type: PublicCategoryItemType


class PublicCategory(BaseModel):
    uuid: str
    name_id: str

    name: str
    items: list[PublicCategoryItem]


class GetCategoriesQueryRaw(BaseModel):
    include_items: Annotated[
        bool,
        Query(alias="include[items]"),
    ] = False
    filter_name_id: Annotated[str | None, Query(alias="filter[name_id]")] = None


class GetCategoriesResponse(BaseModel):
    data: list[PublicCategory]


class NewCategoryBody(BaseModel):
    category_name: str


class NewCategoryResponse(BaseModel):
    data: PublicCategory


GetCategoriesQuery = Annotated[GetCategoriesQueryRaw, Query()]
