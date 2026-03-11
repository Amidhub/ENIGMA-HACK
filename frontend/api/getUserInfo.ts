const getUserInfo = async (userId: number) => {
  console.log(typeof userId);
  
  const response = await fetch(`http://localhost:7777/auth/user/${userId}`, {
    method: 'GET',
    credentials: 'include',
  })
  
  return await response.json();
}

export default getUserInfo; 