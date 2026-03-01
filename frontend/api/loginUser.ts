import UserAuthProps from "../types/UserAuthProps";

const loginUser = async ({userLogin, userPassword }: UserAuthProps) => {
  const response = await fetch(`http://localhost:8000/auth/login`, {
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify({userLogin, userPassword})
  })
  
  return await response.json();
}

export default loginUser;