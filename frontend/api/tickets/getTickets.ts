const getTickets = async () => {
  const response = await fetch(`http://localhost:8000/tickets?status=new`, {
    method: 'GET'
  });
  
  return await response.json();
}

export default getTickets;