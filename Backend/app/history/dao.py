from sqlalchemy import select, insert, delete, update
from app.database import async_session_maker
from app.history.models import TicketHistory

class TickHReq:
    
    model = TicketHistory
    
    @classmethod
    async def get_all_by_id(cls, id):
        async with async_session_maker() as session:
            query = select(cls.model).filter_by(user_id = id)
            res = await session.execute(query)
            return res.scalars().all()
        
    @classmethod
    async def get_all(cls, **kwargs):
        async with async_session_maker() as session:
            query = select(cls.model).filter_by(**kwargs)
            res = await session.execute(query)
            return res.scalars().all()
    
    @classmethod
    async def get_status(cls, id):
        async with async_session_maker() as session:
            query = select(cls.model).filter_by(id = id)
            res = await session.execute(query)
            return res.scalar_one_or_none()
    
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
    async def add_ticket(cls, **data):
        async with async_session_maker() as session:
            query = insert(cls.model).values(**data)
            await session.execute(query)
            await session.commit()
            
    @classmethod
    async def update_ticket(cls, id, **data):
        
        filtered_data = {k: v for k, v in data.items() if v is not None}
        print(filtered_data)
        async with async_session_maker() as session:
            query = (
                update(cls.model)
                .where(cls.model.id == id)
                .values(**filtered_data)
            )
            await session.execute(query)
            await session.commit()
            
    # @classmethod
    # async def delete_ticket(cls, **data):
    #     async with async_session_maker() as session:
    #         query = delete(cls.model).filter_by(**data)
    #         result = await session.execute(query)
    #         await session.commit()
            
    #         return result.rowcount > 0
    # ПЕРЕДЕЛАТЬ В ОДНУ ТРАНЗАКИЮ!!!!! Depend
    @classmethod
    async def delete_ticket(cls, ticket_id: int):
        async with async_session_maker() as session:
            query = select(cls.model).where(cls.model.id == ticket_id)
            result = await session.execute(query)
            ticket = result.scalar_one_or_none()
            
            if not ticket:
                return None
            
            await session.delete(ticket)
            await session.commit()
            
            return ticket