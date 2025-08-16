from fastapi import FastAPI

from app.core.env import Env
from app.lib.fastapi_helpers import use_route_names_as_operation_ids
from app.routes.categories import CategoriesRouter

app = FastAPI(root_path=Env.REVERSE_PROXY_ROOT_PATH)

app.include_router(CategoriesRouter)


use_route_names_as_operation_ids(app)
