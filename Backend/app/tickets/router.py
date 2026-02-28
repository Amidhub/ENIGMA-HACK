from typing import List

from fastapi import APIRouter, HTTPException, Request, Response, status, Depends, Form
from fastapi.responses import RedirectResponse
from app.tickets.dao import TickReq
from app.tickets.schemas import TicketCreate, TicketResponse, TicketUpdate

from typing import Literal

router = APIRouter(
    prefix="/tickets",
    tags=["Работа с вопросами и ответами"]
)

@router.get("", response_model=List[TicketResponse])
async def get(status : Literal["new", "in_progress"]):
    return await TickReq.get_all(status = status)


@router.post("", status_code=status.HTTP_201_CREATED)
async def get(data : TicketCreate):
    ticket_data = data.model_dump(exclude_unset=True)
    await TickReq.add_ticket(**ticket_data)


@router.patch('/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def update(id: int, data: TicketUpdate):
    data = data.model_dump(exclude_unset=True)
    await TickReq.update_ticket(id, **data)

@router.delete('/{id}', status_code=status.HTTP_200_OK)
async def delete(id: int):
    row = await TickReq.delete_ticket(id)
    
    if not row:
        raise HTTPException(status_code=404, detail="Ticket not found")
    
