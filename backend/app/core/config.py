import os
from pydantic import BaseSettings
from typing import Optional
import pathlib

# Get backend directory path
BACKEND_DIR = pathlib.Path(__file__).parent.parent.parent.absolute()

class Settings(BaseSettings):
    APP_NAME: str = "Mystery API"
    DEBUG: bool = False
    
    # MongoDB
    MONGO_URL: str = "mongodb://localhost:27017"
    MONGO_DB: str = "blog_db"
    
    # JWT
    SECRET_KEY: str = "my_super_secret_key"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    class Config:
        env_file = str(BACKEND_DIR / ".env")

settings = Settings() 