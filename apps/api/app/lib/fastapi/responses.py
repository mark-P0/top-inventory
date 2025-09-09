from typing import Any, ClassVar, Type

from fastapi import HTTPException, status
from pydantic import BaseModel


class ErrorResponse(BaseModel):
    status_code: int = status.HTTP_500_INTERNAL_SERVER_ERROR
    title: ClassVar[str] = "Application Error"
    message: str = "An error has occurred"

    @classmethod
    def as_responses_item(cls):
        """
        For use in route decorator `responses` arg
        """

        inst = cls()

        return (
            inst.status_code,
            dict(
                model=cls,
                description=inst.title,
            ),
        )

    @classmethod
    def as_http_exception(cls):
        """
        To be raised inside route
        """

        inst = cls()

        return HTTPException(
            status_code=inst.status_code,
            detail=inst.message,
        )


def create_responses_dict_from_models(
    *models: Type[ErrorResponse],
) -> dict[str | int, dict[str, Any]]:
    return dict(model.as_responses_item() for model in models)
