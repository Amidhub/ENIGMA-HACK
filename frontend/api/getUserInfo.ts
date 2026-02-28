const getUserInfo = async (userId: number) => {
  const response = await fetch(`http://localhost:8000/users/${userId}`, {
    method: 'POST',
    credentials: 'include',
  })
  
  return await response.json();
}

export default getUserInfo;