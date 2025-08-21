from pydantic_settings import BaseSettings


class _Settings(BaseSettings):
    REVERSE_PROXY_ROOT_PATH: str = "/api"


Settings = _Settings()
