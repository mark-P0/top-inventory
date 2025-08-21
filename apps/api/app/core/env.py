import os

from pydantic import BaseModel


class Env(BaseModel):
    REVERSE_PROXY_ROOT_PATH: str = "/api"


ENV = Env.model_validate(os.environ)
