from pydantic_settings import BaseSettings
from typing import Literal

class Setting(BaseSettings):
    MODE : Literal["DEV", "TEST", "PROD"]
    
    DB_HOST : str
    DB_PORT : int
    DB_USER : str
    DB_PASS : str
    DB_NAME : str
    
    EMAIL_PASSWORD : str
    EMAIL_USER : str
    SMTP_HOST : str
    SMTP_PORT : int
    
    IMAP_HOST : str

    class Config:
        env_file = ".env"
        
setting = Setting()