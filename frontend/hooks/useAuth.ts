import loginUser from "@/api/loginUser";
import { useRouter } from "next/navigation"; 
import { useState } from "react"

const useAuth = () => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();
  
  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = await loginUser({login, password});
    console.log(data);
    
    localStorage.setItem('user_id', data);
    router.push('/');  
  }

  return {
    login,
    password,
    setLogin,
    setPassword,
    handleAuth,
  }
}

export default useAuth;