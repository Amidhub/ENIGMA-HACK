import imaplib
import email
from email.header import decode_header

def decode_mime_text(encoded_text):
    """Декодирует любой MIME-закодированный текст"""
    if encoded_text is None:
        return ""
    
    # Если текст не закодирован, возвращаем как есть
    if '=?' not in encoded_text:
        return encoded_text
    
    try:
        decoded_parts = []
        for decoded_bytes, charset in decode_header(encoded_text):
            if isinstance(decoded_bytes, bytes):
                if charset:
                    try:
                        decoded_parts.append(decoded_bytes.decode(charset))
                    except:
                        decoded_parts.append(decoded_bytes.decode('utf-8', errors='ignore'))
                else:
                    decoded_parts.append(decoded_bytes.decode('utf-8', errors='ignore'))
            else:
                decoded_parts.append(decoded_bytes)
        return ''.join(decoded_parts)
    except Exception as e:
        print(f"Ошибка декодирования: {e}")
        return encoded_text

# Подключение к почте Mail.ru
mail = imaplib.IMAP4_SSL("imap.mail.ru")
mail.login("enigmahack_sup@bk.ru", "afmHj4DdvU1fxeCd5KGw")
mail.select("inbox")

# Ищем непрочитанные письма
result, data = mail.search(None, "UNSEEN")
email_ids = data[0].split()

print(f"Найдено новых писем: {len(email_ids)}")

# Читаем все новые письма
for email_id in email_ids:
    result, msg_data = mail.fetch(email_id, "(RFC822)")
    msg = email.message_from_bytes(msg_data[0][1])
    
    # Декодируем тему
    subject = decode_mime_text(msg.get('Subject'))
    
    # Декодируем отправителя (всегда используем функцию)
    from_decoded = decode_mime_text(msg.get('From'))
    
    # Декодируем тему письма если есть
    body = ""
    if msg.is_multipart():
        for part in msg.walk():
            if part.get_content_type() == "text/plain":
                body = part.get_payload(decode=True).decode('utf-8', errors='ignore')
                break
    else:
        body = msg.get_payload(decode=True).decode('utf-8', errors='ignore')
    
    print(f"Тема: {subject}")
    print(f"От: {from_decoded}")
    print(f"Дата: {msg.get('Date')}")
    if body:
        print(f"Текст: {body[:200]}...")  # Первые 200 символов
    print("-" * 50)

mail.close()
mail.logout()