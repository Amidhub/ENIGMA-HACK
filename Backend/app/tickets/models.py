from typing import Annotated, Literal

from app.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Enum, String, Text, DateTime, Integer, Float, JSON
from datetime import datetime
import enum
from typing import Optional

class SentimentEnum(str, enum.Enum):
    POSITIVE = "positive"
    NEUTRAL = "neutral"
    NEGATIVE = "negative"

class StatusEnum(str, enum.Enum):
    NEW = "new"
    IN_PROGRESS = "in_progress"
    ANSWERED = "answered"
    NEEDS_REVIEW = "needs_review"

class Ticket(Base):
    __tablename__ = "tickets"
    
    # Системные поля (автоматические)
    id: Mapped[int] = mapped_column(primary_key=True)
    received_date: Mapped[datetime] = mapped_column(
        DateTime, 
        default=datetime.utcnow,
        comment="Дата поступления письма"
    )
    status: Mapped[StatusEnum] = mapped_column(
        Enum(StatusEnum),
        default=StatusEnum.NEW,
        comment="Статус обработки"
    )
    
    # Данные отправителя (извлекаются из письма)
    full_name: Mapped[Optional[str]] = mapped_column(
        String(255), 
        nullable=True,
        comment="ФИО отправителя"
    )
    email: Mapped[str] = mapped_column(
        String(100),
        comment="Email отправителя"
    )
    phone: Mapped[Optional[str]] = mapped_column(
        String(50), 
        nullable=True,
        comment="Контактный телефон"
    )
    company_object: Mapped[Optional[str]] = mapped_column(
        String(255), 
        nullable=True,
        comment="Название предприятия или объекта"
    )
    
    # Данные о приборах (газоанализаторах)
    device_type: Mapped[Optional[str]] = mapped_column(
        String(100), 
        nullable=True,
        comment="Тип/модель прибора"
    )
    serial_numbers: Mapped[Optional[str]] = mapped_column(
        Text, 
        nullable=True,
        comment="Заводские номера приборов (можно несколько)"
    )
    
    # Содержание обращения
    original_text: Mapped[str] = mapped_column(
        Text,
        comment="Полный текст письма"
    )
    issue_summary: Mapped[Optional[str]] = mapped_column(
        Text, 
        nullable=True,
        comment="Краткое описание проблемы или запрос"
    )
    category: Mapped[Optional[str]] = mapped_column(
        String(100), 
        nullable=True,
        comment="Категория вопроса (неисправность/калибровка/запрос документации)"
    )
    
    # Результаты AI-анализа
    sentiment: Mapped[Optional[SentimentEnum]] = mapped_column(
        Enum(SentimentEnum), 
        nullable=True,
        comment="Эмоциональный окрас письма"
    )
    confidence: Mapped[Optional[float]] = mapped_column(
        Float, 
        nullable=True,
        comment="Уверенность модели в анализе"
    )
    extracted_entities: Mapped[Optional[dict]] = mapped_column(
        JSON, 
        nullable=True,
        comment="Дополнительные сущности (номера заказов, даты и т.п.)"
    )
    
    # Ответы
    generated_response: Mapped[Optional[str]] = mapped_column(
        Text, 
        nullable=True,
        comment="Сгенерированный AI ответ на основе базы знаний"
    )
    final_response: Mapped[Optional[str]] = mapped_column(
        Text, 
        nullable=True,
        comment="Итоговый ответ (после проверки/редактирования оператором)"
    )
    answered_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime, 
        nullable=True,
        comment="Дата отправки ответа"
    )
    
    # Технические поля
    created_at: Mapped[datetime] = mapped_column(
        DateTime, 
        default=datetime.utcnow,
        comment="Время создания записи в БД"
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, 
        default=datetime.utcnow, 
        onupdate=datetime.utcnow,
        comment="Время последнего обновления"
    )