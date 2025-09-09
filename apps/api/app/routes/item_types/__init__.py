from fastapi import APIRouter

from app.routes.item_types.new_item_type import new_item_type, new_item_type_responses

ItemTypesRouter = APIRouter(prefix="/item_types")


ItemTypesRouter.post("/", responses=new_item_type_responses)(new_item_type)
