from fastapi import FastAPI

from app.routes.categories import CategoriesRouter

app = FastAPI()

app.include_router(CategoriesRouter)
