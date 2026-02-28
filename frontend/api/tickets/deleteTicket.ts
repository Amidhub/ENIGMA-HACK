import CellTableProps from "@/types/CellTableProps";

const addTicketApi = async (ticket: CellTableProps) => {
  const response = await fetch(`http://localhost:8000/tickets/${ticket.id}`, {
    method: 'DELETE',
  });
  
  return await response.json();
}

export default addTicketApi;