from dotenv import load_dotenv
import os
from pydantic_settings import BaseSettings

load_dotenv()
class Settings():
    database_hostname = os.environ.get("DATABASE_HOSTNAME")
    database_port = os.environ.get("DATABASE_PORT")
    database_password = os.environ.get("DATABASE_PASSWORD")
    database_name = os.environ.get("DATABASE_NAME")
    secret_key = os.environ.get("SECRET_KEY")
    algorithm = os.environ.get("ALGORITHM")
    access_token_expiration_time_minutes = int(os.environ.get("ACCESS_TOKEN_EXPIRATION_TIME_MINUTES"))
    base_url = os.environ.get("BASE_URL")

settings = Settings()