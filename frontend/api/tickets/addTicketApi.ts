import TicketResponse from "@/types/ResponseTicketProps";

const addTicketApi = async (ticket: Partial<TicketResponse>) => {

  const response = await fetch(`http://localhost:7777/tickets`, {
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify({...ticket, status: 'new'})
  });
  
  return await response.json();
}

export default addTicketApi;