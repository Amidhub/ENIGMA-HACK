
import getUserInfo from "@/api/getUserInfo";
import { useEffect, useState } from "react"
import { useNotification } from "./useNotification";
import { useRouter } from "next/navigation";

const useUser = () => {
  const [userFullName, setUserFullName] = useState<string>('');
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
    setUserFullName(data.full_name);
  }

  useEffect(() => {
    handleUserProfile()
  }, []);

  return {
    userFullName,
    setUserFullName,
    handleUserProfile,
  }
}

export default useUser;