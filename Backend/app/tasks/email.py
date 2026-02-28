from email.message import EmailMessage
from app.config import setting
from pydantic import EmailStr

def create_booking_confirmation_template(
    email_to : EmailStr
):
    email = EmailMessage()
    
    email["Subject"] = "Подтверждение бронирования"
    email["From"] = setting.EMAIL_USER
    email["To"] = email_to
    
    email.set_content(
        f"""
            <h1>TEST ANSWER</h1>
            
        """,
        subtype = "html"
    )
    
    return email