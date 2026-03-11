const getTickets = async () => {
  const response = await fetch(`http://localhost:7777/tickets?status=new`, {
    method: 'GET',
    credentials: 'include',
  });
  
  return await response.json();
}

export default getTickets;