import { useState } from "react"

const useAuth = () => {
  const [userLogin, setUserLogin] = useState<string>('');
  const [userPassword, setUsetPassword] = useState<string>('');
  const [isRemember, setIsRemember] = useState<boolean>(false);

  const handleAuth = () => {

  }




  return {
    userLogin,
    userPassword,
    isRemember,
    setUserLogin,
    setUsetPassword,
    setIsRemember,
    handleAuth,
  }
}

export default useAuth;