import typing as T


def as_any(val: object, /, reason: str):
    return T.cast(T.Any, val)
