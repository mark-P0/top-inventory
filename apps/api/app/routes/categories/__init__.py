from fastapi import APIRouter

from app.routes.categories.edit_category import edit_category, edit_category_responses
from app.routes.categories.get_categories import get_categories
from app.routes.categories.new_category import new_category, new_category_responses
from app.routes.categories.remove_category import remove_category

CategoriesRouter = APIRouter(prefix="/categories")


CategoriesRouter.get("/")(get_categories)
CategoriesRouter.post("/", responses=new_category_responses)(new_category)
CategoriesRouter.patch("/{uuid}", responses=edit_category_responses)(edit_category)
CategoriesRouter.delete("/{uuid}")(remove_category)
