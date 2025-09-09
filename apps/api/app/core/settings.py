from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

"""
Used to suppress Pylance saying that a required argument is not given.
All fields are source from environment variables.

https://github.com/pydantic/pydantic/issues/3753#issuecomment-1060850457
"""
RequiredField = Field(default=...)


class _Settings(BaseSettings):
    REVERSE_PROXY_ROOT_PATH: str = "/api"
    DB_URL: str = RequiredField
    MUTATION_TOKEN: str = RequiredField

    model_config = SettingsConfigDict(env_file=".env")


Settings = _Settings()
