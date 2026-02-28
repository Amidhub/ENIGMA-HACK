from app.database import Base
from sqlalchemy import Integer, JSON, Column, String

class Operator(Base):
    __tablename__ = "operators"
    
    id = Column(Integer, primary_key=True)
    login = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)