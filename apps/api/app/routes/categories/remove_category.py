from app.core.dependencies.mutation_token import MutationTokenDependency
from app.db import SessionDependency
from app.db.categories import (
    delete_category,
)


def remove_category(
    session: SessionDependency,
    _: MutationTokenDependency,
    uuid: str,
):
    delete_category(
        session,
        uuid=uuid,
    )

    return dict(
        data=True,
    )
