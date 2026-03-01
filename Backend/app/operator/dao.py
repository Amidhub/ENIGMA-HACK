from sqlalchemy import select, insert
from app.database import async_session_maker
from app.operator.models import Operator

class OperReq:
    
    model = Operator
    
    @classmethod
    async def get_all(cls, **kwargs):
        async with async_session_maker() as session:
            query = select(cls.model).filter_by(**kwargs)
            res = await session.execute(query)
            return res.scalars().all()
    
    @classmethod
    async def get_one_or_none(cls, **kwargs):
        async with async_session_maker() as session:
            query = select(cls.model).filter_by(**kwargs)
            
            res = await session.execute(query)
            
            return res.scalars().one_or_none()
    
    @classmethod
    async def get_one_by_id(cls,  id : int):
        async with async_session_maker() as session:
            query = select(cls.model).filter_by(id = id)
            
            res = await session.execute(query)
            return res.scalars().one_or_none()
        
    @classmethod
    async def add(cls, **data):
        async with async_session_maker() as session:
            query = insert(cls.model).values(**data).returning(cls.model.id)
            result = await session.execute(query)
            await session.commit()
            
            return result.scalar_one()  #id
    
    @classmethod
    async def get_name(cls, **kwargs):
        async with async_session_maker() as session:
            query = select(cls.model).filter_by(**kwargs)
            
            res = await session.execute(query)
            
            return res.scalars().one_or_none()
            
            