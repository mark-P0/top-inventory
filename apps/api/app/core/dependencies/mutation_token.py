from typing import Annotated, ClassVar

from fastapi import Depends, Header, status
from pydantic import BaseModel

from app.core.settings import Settings
from app.lib.fastapi.responses import ErrorResponse
from app.lib.http.auth import AuthorizationHeader


class MutationUnauthorizedErrorResponse(ErrorResponse):
    status_code: int = status.HTTP_401_UNAUTHORIZED
    title: ClassVar[str] = "Mutation Unauthorized"
    message: str = "Mutation token possibly missing and/or incorrect"


class RequestHeadersModel(BaseModel):
    authorization: str


RequestHeaders = Annotated[RequestHeadersModel, Header()]


def get_mutation_token(headers: RequestHeaders):
    token = AuthorizationHeader(headers.authorization).bearer_token
    if token != Settings.MUTATION_TOKEN:
        raise MutationUnauthorizedErrorResponse.as_http_exception()

    return token


MutationTokenDependency = Annotated[str, Depends(get_mutation_token)]
