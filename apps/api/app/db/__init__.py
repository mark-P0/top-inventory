"""
https://fastapi.tiangolo.com/tutorial/sql-databases
"""

from sqlmodel import SQLModel, create_engine

from app.core.settings import Settings

engine = create_engine(Settings.DB_URL)


def initialize_db():
    SQLModel.metadata.create_all(engine)
