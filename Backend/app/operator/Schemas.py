from pydantic import BaseModel

class authS(BaseModel):
    login : str
    password: str