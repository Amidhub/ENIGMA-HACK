import UserAuthProps from "../types/UserAuthProps";

const loginUser = async ({userLogin, userPassword, isRemember}: UserAuthProps) => {
  const SERVER_URL_API = process.env.SERVER_URL_API;

  const response = await fetch(`${SERVER_URL_API}/api/login`, {
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify({userLogin, userPassword, isRemember})
  })
  
  const serverResponse = await response.json();
  return serverResponse;
}

export default loginUser;