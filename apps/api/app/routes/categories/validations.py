from typing import Annotated

from fastapi import Query
from pydantic import BaseModel

from app.db.models import Category


class PublicCategoryItemType(BaseModel):
    uuid: str

    name: str


class PublicCategoryItem(BaseModel):
    uuid: str

    name: str
    item_type: PublicCategoryItemType

    @staticmethod
    def generate_from_db(category: Category):
        for item in category.items:
            yield PublicCategoryItem(
                uuid=str(item.uuid),
                name=item.name,
                item_type=PublicCategoryItemType(
                    uuid=str(item.item_type.uuid),
                    name=item.item_type.name,
                ),
            )


class PublicCategory(BaseModel):
    uuid: str
    name_id: str

    name: str
    items: list[PublicCategoryItem]

    @staticmethod
    def from_db(
        category: Category,
        /,
        with_items: bool = True,
    ):
        items = []
        if with_items:
            items = [*PublicCategoryItem.generate_from_db(category)]

        return PublicCategory(
            uuid=str(category.uuid),
            name_id=category.name_id,
            name=category.name,
            items=items,
        )


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
