from fastapi import FastAPI

from app.core.settings import Settings
from app.lib.fastapi_helpers import use_route_names_as_operation_ids
from app.routes.categories import CategoriesRouter

app = FastAPI(
    root_path=Settings.REVERSE_PROXY_ROOT_PATH,
)

app.include_router(CategoriesRouter)


use_route_names_as_operation_ids(app)
