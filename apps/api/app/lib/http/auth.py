class AuthorizationHeader:
    """
    Might be better to use an established library for this
    """

    def __init__(self, authorization: str) -> None:
        self.__parse_authorization_header(authorization)

    def __parse_authorization_header(self, authorization: str):
        """
        Expected format is
        Authorization: {SCHEME} {VALUE}
        """

        parts = authorization.split(" ")
        if len(parts) != 2:
            raise Exception("Invalid authorization header")

        self.scheme = parts[0]
        self.value = parts[1]

    @property
    def is_bearer(self):
        return self.scheme.lower() == "bearer"

    @property
    def bearer_token(self):
        if not self.is_bearer:
            raise Exception("Authorization header not Bearer scheme")

        return self.value
