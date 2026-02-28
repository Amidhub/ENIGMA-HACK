from typing import List

from fastapi import APIRouter, HTTPException, Request, Response, status, Depends, Form
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
from app.tickets.dao import TickReq
from app.email.schemas import Answer_to_email
from app.tasks.tasks import send_answer_email
from app.history.models import TicketHistory
from app.tasks.tasks import process_new_emails_task

router = APIRouter(
    prefix="/email",
    tags=["Работа с отправкой и получением почты"]
)

@router.post("send_messege", status_code=status.HTTP_201_CREATED)
async def get(data : Answer_to_email):
    row = await TickReq.delete_ticket(data.id)
    #добавить в history
    send_answer_email.delay(
            answer=data.answer,
            email_to=data.email
        )


class CheckResponse(BaseModel):
    task_id: str
    message: str

@router.post("/check", response_model=CheckResponse)
async def trigger_email_check():
    """
    Фронт вызывает эту ручку, когда хочет проверить почту
    Бэкенд запускает Celery задачу и сразу отвечает
    """
    task = process_new_emails_task.delay()
    return {
        "task_id": task.id,
        "message": "Проверка почты запущена"
    }