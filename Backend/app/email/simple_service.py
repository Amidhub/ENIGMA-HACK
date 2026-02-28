import imaplib
import email
from email.header import decode_header
from typing import List, Dict, Optional
import logging

logger = logging.getLogger(__name__)

class SimpleEmailReader:
    """Простой читатель почты"""
    
    def __init__(self, host: str, email: str, password: str):
        self.host = host
        self.email = email
        self.password = password
    
    def get_new_messages(self, limit: int = 10) -> List[Dict]:
        """Получить новые (непрочитанные) письма"""
        messages = []
        mail = None
        
        try:
            # Подключаемся к почте
            mail = imaplib.IMAP4_SSL(self.host, timeout=30, port=993)
            mail.login(self.email, self.password)
            mail.select("inbox")
            
            # Ищем непрочитанные письма
            result, data = mail.search(None, "UNSEEN")
            email_ids = data[0].split()
            
            logger.info(f"📧 Найдено новых писем: {len(email_ids)}")
            
            # Берем последние limit писем
            for email_id in email_ids[-limit:]:
                try:
                    result, msg_data = mail.fetch(email_id, "(RFC822)")
                    msg = email.message_from_bytes(msg_data[0][1])
                    
                    # Получаем тему
                    subject = self._decode_header(msg.get('Subject', 'Без темы'))
                    
                    # Получаем отправителя
                    from_ = self._decode_header(msg.get('From', ''))
                    email_addr = self._extract_email(from_)
                    
                    # Получаем текст письма
                    body = self._get_text(msg)
                    
                    messages.append({
                        "id": email_id.decode() if isinstance(email_id, bytes) else str(email_id),
                        "from_email": email_addr,
                        "from_name": self._extract_name(from_),
                        "subject": subject,
                        "body": body[:5000],  # Ограничиваем длину
                        "date": msg.get('Date', '')
                    })
                    
                    # Отмечаем как прочитанное (чтобы больше не приходило)
                    mail.store(email_id, '+FLAGS', '\\Seen')
                    
                except Exception as e:
                    logger.error(f"Ошибка при обработке письма: {e}")
                    continue
                    
        except Exception as e:
            logger.error(f"Ошибка подключения к почте: {e}")
            
        finally:
            if mail:
                try:
                    mail.close()
                    mail.logout()
                except:
                    pass
        
        return messages
    
    def _decode_header(self, header: str) -> str:
        """Декодирование заголовка"""
        if not header:
            return ""
        
        try:
            decoded_parts = []
            for part, charset in decode_header(header):
                if isinstance(part, bytes):
                    if charset:
                        try:
                            decoded_parts.append(part.decode(charset))
                        except:
                            decoded_parts.append(part.decode('utf-8', errors='ignore'))
                    else:
                        decoded_parts.append(part.decode('utf-8', errors='ignore'))
                else:
                    decoded_parts.append(part)
            return ' '.join(decoded_parts)
        except:
            return header
    
    def _extract_email(self, from_str: str) -> str:
        """Извлечь email из строки вида 'Имя <email@mail.ru>'"""
        import re
        match = re.search(r'<(.+?)>', from_str)
        if match:
            return match.group(1)
        return from_str.strip()
    
    def _extract_name(self, from_str: str) -> str:
        """Извлечь имя из строки вида 'Имя <email@mail.ru>'"""
        if '<' in from_str:
            return from_str.split('<')[0].strip()
        return ""
    
    def _get_text(self, msg) -> str:
        """Извлечение текста из письма"""
        try:
            if msg.is_multipart():
                for part in msg.walk():
                    if part.get_content_type() == "text/plain":
                        payload = part.get_payload(decode=True)
                        if payload:
                            return payload.decode('utf-8', errors='ignore')
            else:
                payload = msg.get_payload(decode=True)
                if payload:
                    return payload.decode('utf-8', errors='ignore')
        except:
            pass
        return ""