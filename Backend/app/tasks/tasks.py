from app.tasks.email import create_booking_confirmation_template
from app.tasks.celery import celery
import aiosmtplib
import asyncio
from app.config import setting


from app.email.simple_service import SimpleEmailReader
from app.database import async_session_maker
from app.tickets.models import Ticket
# from app.neural.service import NeuralService  # твоя нейронка
import logging
from datetime import datetime
import asyncio




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




logger = logging.getLogger(__name__)

email_reader = SimpleEmailReader(
    host=setting.IMAP_HOST,
    email=setting.EMAIL_USER,
    password=setting.EMAIL_PASSWORD
)

# neural_service = NeuralService()  # твоя нейронка

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
        print(messages[0]['body'])
        return
        processed_count = 0
        for msg in messages:
            # 2. Отправляем в нейронку (синхронно или асинхронно)
            # neural_response = neural_service.analyze({
            #     "text": msg['body'],
            #     "subject": msg['subject'],
            #     "from": msg['from_email']
            # })
            
            # 3. Сохраняем в БД (используем async_to_sync)
            asyncio.run(save_ticket_to_db(msg, neural_response))
            processed_count += 1
        
        return {
            "processed": processed_count,
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
            from_name=msg.get('from_name'),
            subject=msg['subject'],
            original_text=msg['body'],
            generated_response=neural_response.get('answer'),
            sentiment=neural_response.get('sentiment'),
            confidence=neural_response.get('confidence'),
            status="new",
            created_at=datetime.utcnow()
        )
        session.add(ticket)
        await session.commit()