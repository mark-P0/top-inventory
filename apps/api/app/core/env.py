import os


class Env:
    REVERSE_PROXY_ROOT_PATH = os.environ.get("REVERSE_PROXY_ROOT_PATH") or "/api"
