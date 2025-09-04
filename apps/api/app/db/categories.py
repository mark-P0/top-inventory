from typing import Literal, TypedDict

from pydantic import BaseModel
from pydash import kebab_case
from sqlmodel import col, or_, select

from app.db import SessionDependency
from app.db.models import Category


class GetAllFilter(TypedDict):
    name_id: str | None


class EditCategoryData(BaseModel):
    name: str | None = None


class AddCategoryResult(BaseModel):
    success: bool
    error: None | Literal["CATEGORY_ALREADY_EXISTING"] = None
    data: "None | Category" = None


class EditCategoryResult(BaseModel):
    success: bool
    error: None | Literal["CATEGORY_NOT_EXISTING"] = None
    data: "None | Category" = None


def get_all_categories(
    session: SessionDependency,
    /,
    filter: GetAllFilter,
):
    def statement():
        _statement = select(Category)

        if filter["name_id"] is not None:
            _statement = _statement.where(Category.name_id == filter["name_id"])

        _statement = _statement.order_by(col(Category.created_at))

        return _statement

    result = session.exec(statement()).all()

    return result


def create_category(
    session: SessionDependency,
    /,
    category_name: str,
) -> AddCategoryResult:
    name_id = kebab_case(category_name)

    existing_category = session.exec(
        select(Category).where(
            or_(
                Category.name == category_name,
                Category.name_id == name_id,
            )
        )
    ).one_or_none()
    if existing_category is not None:
        return AddCategoryResult(
            success=False,
            error="CATEGORY_ALREADY_EXISTING",
        )

    category = Category(
        name=category_name,
        name_id=name_id,
    )

    session.add(category)
    session.commit()

    return AddCategoryResult(
        success=True,
        data=category,
    )


def update_category(
    session: SessionDependency,
    /,
    uuid: str,
    data: EditCategoryData,
):
    category = session.exec(
        select(Category).where(
            Category.uuid == uuid,
        ),
    ).one_or_none()
    if category is None:
        return EditCategoryResult(
            success=False,
            error="CATEGORY_NOT_EXISTING",
        )

    if data.name is not None:
        category.name = data.name
        category.name_id = kebab_case(data.name)

    session.add(category)
    session.commit()

    return EditCategoryResult(
        success=True,
        data=category,
    )
