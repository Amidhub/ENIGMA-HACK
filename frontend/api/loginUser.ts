import UserAuthProps from "../types/UserAuthProps";

const loginUser = async ({login, password }: UserAuthProps) => {
  console.log(login, password);
  
  const response = await fetch(`http://localhost:8000/auth/login`, {
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify({login, password})
  })
  
  return await response.json();
}

export default loginUser;