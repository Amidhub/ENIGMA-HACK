const getTickets = async () => {
  const response = await fetch(`http://localhost:8000/tickets?status=NEW`);
  
  return await response.json();
}

export default getTickets;