import UserAuthProps from "../types/UserAuthProps";

const loginUser = async ({login, password}: UserAuthProps) => {  
  const response = await fetch(`http://localhost:7777/auth/login`, {
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify({login, password})
  })
  
  return await response.json();
}

export default loginUser;