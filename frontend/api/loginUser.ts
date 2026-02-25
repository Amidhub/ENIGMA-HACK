import UserAuthProps from "../types/UserAuthProps";

const loginUser = async ({userLogin, userPassword, isRemember}: UserAuthProps) => {
  const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/login`, {
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify({userLogin, userPassword, isRemember})
  })
  
  return await response.json();
}

export default loginUser;