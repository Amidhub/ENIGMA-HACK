const sendEmail = async (id: number, email: string, answer: string) => {
   const response = await fetch(`http://localhost:8000/emailsend_messege`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id, email, answer})
  });

  return await response.json();
}

export default sendEmail;