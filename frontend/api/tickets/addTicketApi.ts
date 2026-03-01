import CellTableProps from "@/types/CellTableProps";

const addTicketApi = async (ticket: CellTableProps) => {
  const response = await fetch(`http://localhost:8000/tickets`, {
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify({ticket})
  });
  
  return await response.json();
}

export default addTicketApi;