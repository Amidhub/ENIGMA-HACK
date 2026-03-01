
import getUserInfo from "@/api/getUserInfo";
import { useEffect, useState } from "react"
import { useNotification } from "./useNotification";
import { useRouter } from "next/navigation";

const useUser = () => {
  const [userLogin, setUserLogin] = useState<string>('');
  const { addNotification } = useNotification();
  const router = useRouter();

  const handleUserProfile = async () => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      addNotification('error', 'Id пользователя не найден');
      router.push('/login');
      return null;
    }
    const data = await getUserInfo(Number(userId));
    if (!data.success) {
      addNotification('error', 'Ошибка');
      return null;
    }
    setUserLogin(data.login);
  }

  useEffect(() => {
    handleUserProfile()
  }, []);

  return {
    userLogin,
    setUserLogin,
    handleUserProfile,
  }
}

export default useUser;