## Database migrations

```sh
# Generate migration file
uv run alembic revision --autogenerate -m "MIGRATION_MESSAGE_HERE"

# Review generated migration file

# Apply migrations
uv run alembic upgrade head
```

### Database URL

- Assigned from environment variable (via Pydantic Settings)

### Models

- `SQLModel` models file are imported, then the metadata is given to Alembic
- Without this, auto-generating migrations is not possible!
