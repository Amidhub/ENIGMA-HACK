from sqladmin import ModelView

from app.operator.models import Operator
from app.tickets.models import Ticket

class OperatorAdmin(ModelView, model=Operator):
    column_list = [Operator.id, Operator.login]
    can_delete = False
    name = "Operator"
    name_plural = "Operators"
    icon = "fa-solid fa-user"
    # column_details_exclude_list = [Operator.hashed_password]
    
class TicketAdmin(ModelView, model = Ticket):
    column_list = [c.name for c in Ticket.__table__._columns]
    name = "Ticket"
    name_plural = "Tickets"
    icon = "fa-solid fa-book"