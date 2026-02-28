from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr


class TicketResponse(BaseModel):
    id: int
    created_at : datetime
    company_object : str | None
    phone : str | None
    serial_numbers : str | None
    device_type : str | None
    email: str | None
    sentiment : str | None
    original_text : str | None
    generated_response : str | None

class TicketUpdate(BaseModel):
    subject: str | None = None
    original_text: str | None = None
    generated_answer: str | None = None
    final_answer: str | None = None
    status: None | str = None


class TicketCreate(BaseModel):
    email: EmailStr
    subject: str = None
    original_text: str
    full_name: Optional[str] = None
    phone: Optional[str] = None
    company_object: Optional[str] = None
    device_type: Optional[str] = None
    serial_numbers: Optional[str] = None
    issue_summary: Optional[str] = None
    category: Optional[str] = None
    status: str = "new"
