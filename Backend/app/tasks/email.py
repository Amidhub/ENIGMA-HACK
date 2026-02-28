from email.message import EmailMessage
from app.config import setting
from pydantic import EmailStr

def create_booking_confirmation_template(
    email_to : EmailStr,
    answer : str
):
    email = EmailMessage()
    
    email["Subject"] = "Ответ на сообщение"
    email["From"] = setting.EMAIL_USER
    email["To"] = email_to
    
    email.set_content(
        answer,
        subtype = "html"
    )
    
    return email