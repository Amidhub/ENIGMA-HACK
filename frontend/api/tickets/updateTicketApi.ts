import CellTableProps from "@/types/CellTableProps";
import TicketResponse from "@/types/ResponseTicketProps";

const updateTicketApi = async (ticket: TicketResponse) => {
  const response = await fetch(`http://localhost:8000/tickets/${ticket.id}`, {
    method: 'PATCH',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify({ticket})
  });
  
  return await response.json();
}

export default updateTicketApi;