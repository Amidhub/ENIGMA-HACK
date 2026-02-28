import loginUser from "@/api/loginUser";
import { useRouter } from "next/navigation"; 
import { useState } from "react"

const useAuth = () => {
  const [userLogin, setUserLogin] = useState<string>('');
  const [userPassword, setUsetPassword] = useState<string>('');
  const router = useRouter();
  
  const handleAuth = async () => {
    const data = await loginUser({userLogin, userPassword});
    if (!data.success) {
      return null;
    }
    localStorage.setItem('user_id', data.user_id);
    router.push('/');  
  }

  return {
    userLogin,
    userPassword,
    setUserLogin,
    setUsetPassword,
    handleAuth,
  }
}

export default useAuth;