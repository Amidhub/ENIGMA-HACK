from pydantic import BaseModel, EmailStr, Field


class Answer_to_email(BaseModel):
    id : int
    email : EmailStr
    answer : str = Field(max_length=400)
    