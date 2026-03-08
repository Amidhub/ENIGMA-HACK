from app.tasks.email import create_booking_confirmation_template
from app.tasks.celery import celery
import aiosmtplib
import asyncio
from app.config import setting
from app.email.simple_service import SimpleEmailReader
from app.database import async_session_maker
from app.tickets.models import Ticket
from app.answer_pdf import analyze  # Импортируем analyze
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

email_reader = SimpleEmailReader(
    host=setting.IMAP_HOST,
    email=setting.EMAIL_USER,
    password=setting.EMAIL_PASSWORD
)

@celery.task
def send_answer_email(answer: str, email_to: str):
    msg_content = create_booking_confirmation_template(email_to, answer)
    
    async def send():
        smtp = aiosmtplib.SMTP(
            hostname=setting.SMTP_HOST,
            port=setting.SMTP_PORT,
            use_tls=True
        )
        await smtp.connect()
        await smtp.login(setting.EMAIL_USER, setting.EMAIL_PASSWORD)
        await smtp.send_message(msg_content)
        await smtp.quit()
    
    asyncio.run(send())
    return f"Письмо отправлено на {email_to}"

@celery.task(name="process_new_emails")
def process_new_emails_task():
    """
    1. Читает новые письма
    2. Отправляет в нейронку
    3. Сохраняет ответы в БД
    """
    logger.info("📧 Запуск обработки новых писем...")
    
    try:
        # 1. Читаем письма
        messages = email_reader.get_new_messages(limit=10)
        
        if not messages:
            logger.info("📭 Новых писем нет")
            return {"processed": 0}
        
        logger.info(f"✅ Найдено {len(messages)} писем")
        
        processed_count = 0
        for msg in messages:
            try:
                # 2. Отправляем в нейронку (синхронно вызываем асинхронную функцию)
                neural_response = asyncio.run(analyze({
                    "text": msg['body'],
                    "subject": msg['subject'],
                    "from": msg['from_email']
                }))
                
                # 3. Сохраняем в БД
                asyncio.run(save_ticket_to_db(msg, neural_response))
                processed_count += 1
                
                logger.info(f"✅ Обработано письмо от {msg['from_email']}")
                
            except Exception as e:
                logger.error(f"❌ Ошибка при обработке письма от {msg['from_email']}: {e}")
                # Продолжаем обработку следующих писем
                continue
        
        return {
            "processed": processed_count,
            "total": len(messages),
            "status": "success"
        }
        
    except Exception as e:
        logger.error(f"❌ Ошибка: {e}")
        return {"error": str(e)}

async def save_ticket_to_db(msg: dict, neural_response: dict):
    """Сохранить тикет в БД"""
    async with async_session_maker() as session:
        ticket = Ticket(
            email=msg['from_email'],
            full_name=msg.get('from_name', ''),
            original_text=msg['body'],
            generated_response=neural_response.get('answer'),
            sentiment=neural_response.get('sentiment'),
            confidence=neural_response.get('confidence'),
            status="new",
            received_date=datetime.utcnow(),  # Добавил received_date
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()  # Добавил updated_at
        )
        session.add(ticket)
        await session.commit()
        logger.info(f"💾 Тикет сохранен в БД, ID: {ticket.id}")