from app.tasks.email import create_booking_confirmation_template
from app.tasks.celery import celery
import aiosmtplib
import asyncio
from app.config import setting

@celery.task
def send_answer_email(answer: dict, email_to: str):
    msg_content = create_booking_confirmation_template(setting.EMAIL_USER)
    
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