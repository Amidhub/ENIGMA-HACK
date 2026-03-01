const getUserInfo = async (userId: number) => {
  const response = await fetch(`http://localhost:8000/auth/user/${userId}`, {
    method: 'POST',
    credentials: 'include',
  })
  
  return await response.json();
}

export default getUserInfo;