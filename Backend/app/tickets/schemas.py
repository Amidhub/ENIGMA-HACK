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
    email: str
    sentiment : str | None
    original_text : str | None
    generated_response : str | None

class TicketUpdate(BaseModel):
    # subject: str | None = None
    # issue_summary: str | None = None
    # generated_response: str | None = None
    # final_response: str | None = None
    # status: None | str = None
    full_name: Optional[str] = None
    phone: Optional[str] = None
    company_object: Optional[str] = None
    device_type: Optional[str] = None
    serial_numbers: Optional[str] = None
    issue_summary: Optional[str] = None
    category: Optional[str] = None
    status: Optional[str] = None
    sentiment: Optional[str] = None
    confidence: Optional[float] = None
    extracted_entities: Optional[dict] = None
    generated_response: Optional[str] = None
    final_response: Optional[str] = None
    answered_at: Optional[datetime] = None


class TicketCreate(BaseModel):
    email: EmailStr
    original_text: str
    full_name: Optional[str] = None
    phone: Optional[str] = None
    company_object: Optional[str] = None
    device_type: Optional[str] = None
    serial_numbers: Optional[str] = None
    issue_summary: Optional[str] = None
    category: Optional[str] = None
    status: str = "new" 
