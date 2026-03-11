import CellTableProps from "@/types/CellTableProps";

const updateStatus = async (ticket: CellTableProps) => {
  const response = await fetch(`http://localhost:7777/tickets/${ticket.id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({status: 'in_progress'}),
    credentials: "include",
  });
  
  return await response.json();
}

export default updateStatus;