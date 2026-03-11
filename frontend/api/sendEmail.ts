const sendEmail = async (id: number, email: string, answer: string) => {
   const response = await fetch(`http://localhost:7777/emailsend_messege`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id, email, answer}),
    credentials: "include",
  });

  return await response.json();
}

export default sendEmail;