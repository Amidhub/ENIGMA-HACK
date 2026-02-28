import CellTableProps from "@/types/CellTableProps";

const checkStatus = async (ticket: CellTableProps) => {
  const response = await fetch(`http://localhost:8000/tickets/check/${ticket.id}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  });
  
  return await response.json();
}

export default checkStatus;