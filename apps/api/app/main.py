from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.core.settings import Settings
from app.db import initialize_db
from app.lib.fastapi.openapi import use_route_names_as_operation_ids
from app.routes.categories import CategoriesRouter


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    https://fastapi.tiangolo.com/advanced/events/#lifespan
    """

    ## Startup
    initialize_db()

    yield  # App is running

    ## Shutdown
    ...


app = FastAPI(
    lifespan=lifespan,
    root_path=Settings.REVERSE_PROXY_ROOT_PATH,
)

app.include_router(CategoriesRouter)


use_route_names_as_operation_ids(app)
