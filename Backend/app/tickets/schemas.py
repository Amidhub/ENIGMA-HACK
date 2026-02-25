from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr


class TicketResponse(BaseModel):
    id: int
    email: str
    subject: str
    original_text: str
    generated_answer: str | None
    final_answer: str | None
    status: str
    created_at: datetime

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
