from fastapi import FastAPI

from app.lib.fastapi_helpers import use_route_names_as_operation_ids
from app.routes.categories import CategoriesRouter

app = FastAPI()

app.include_router(CategoriesRouter)


use_route_names_as_operation_ids(app)
