from typing import Annotated

from fastapi import Query
from pydantic import BaseModel

from app.core.dependencies.db import SessionDependency
from app.db.categories import GetAllCategoriesFilter, get_all_categories
from app.routes.categories.validations import PublicCategory


class RequestQueryRaw(BaseModel):
    include_items: Annotated[bool, Query(alias="include[items]")] = False
    filter_name_id: Annotated[str | None, Query(alias="filter[name_id]")] = None


class ResponseBody(BaseModel):
    data: list[PublicCategory]


RequestQuery = Annotated[RequestQueryRaw, Query()]


def get_categories(
    session: SessionDependency,
    query: RequestQuery,
) -> ResponseBody:
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

    return ResponseBody(
        data=public_categories,
    )
