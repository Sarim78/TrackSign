# TODO: SQLAlchemy engine and session setup
# - Create engine from DATABASE_URL (do not connect at import time until env is configured)
# - Configure SessionLocal via sessionmaker
# - Add a get_db() FastAPI dependency that yields a session and closes it after the request

engine = None
SessionLocal = None
