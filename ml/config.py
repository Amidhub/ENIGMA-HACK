from pydantic_settings import BaseSettings
from typing import Literal

class Setting(BaseSettings):
    
    MISTRAL_API_KEY : str

    class Config:
        env_file = ".env"
        
setting = Setting()