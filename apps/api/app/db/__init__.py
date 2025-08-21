"""
https://fastapi.tiangolo.com/tutorial/sql-databases
"""

from typing import Annotated

from fastapi import Depends
from sqlmodel import Session, SQLModel, create_engine

from app.core.settings import Settings

engine = create_engine(Settings.DB_URL)


def initialize_db():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


SessionDependency = Annotated[Session, Depends(get_session)]
