const logOutUser = async (userId: number) => {
  const response = await fetch(`http://localhost:8000/auth/login`, {
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    credentials: 'include',
  })
  
  return await response.json();
}

export default logOutUser;