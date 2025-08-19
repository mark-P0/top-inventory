from typing import Annotated

from fastapi import Query
from pydantic import BaseModel


class PublicCategory(BaseModel):
    name_id: str

    name: str

    item_type_ct: int | None = None
    total_item_ct: int | None = None


class GetCategoriesQueryRaw(BaseModel):
    include_item_type_ct: Annotated[
        bool,
        Query(alias="include[item_type_ct]"),
    ] = False
    include_total_item_ct: Annotated[
        bool,
        Query(alias="include[total_item_ct]"),
    ] = False
    filter_name_id: Annotated[str | None, Query(alias="filter[name_id]")] = None


class GetCategoriesResponse(BaseModel):
    data: list[PublicCategory]


GetCategoriesQuery = Annotated[GetCategoriesQueryRaw, Query()]
