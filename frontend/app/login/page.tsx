'use client'

import useAuth from "@/hooks/useAuth";
import Link from "next/link";

const Login = () => {
  const {
    userLogin,
    userPassword,
    isRemember,
    setIsRemember,
    setUserLogin,
    setUsetPassword,
  } = useAuth();


  return (
    <div className="flex justify-center items-center h-screen p-2">
      <div className="flex justify-center p-20">
        <form className="flex flex-col p-10 rounded-2xl gap-6 w-96 max-w-md bg-white/20 backdrop-blur-md border-2 border-white/30">
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="input-login">Логин</label>
              <input 
                value={userLogin}
                onChange={(e) => setUserLogin(e.target.value)}
                type="text" 
                className="border-2 rounded-lg p-2 w-full focus:outline-none focus:border-[#77BFA3] focus:transition-all duration-300" 
                id="input-login" 
                placeholder="Логин"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="input-password">Пароль</label>
              <input 
                type="password" 
                value={userPassword}
                onChange={(e) => setUsetPassword(e.target.value)}
                className="border-2 rounded-lg p-2 w-full focus:outline-none focus:border-[#77BFA3] focus:transition-all duration-300" 
                id="input-password" 
                placeholder="Пароль"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-[#000000]">
              <input
                type="checkbox"
                className="hidden"
                checked={isRemember}
                onChange={() => setIsRemember(!isRemember)}
              />
              <div
                className={`w-16 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isRemember ? 'bg-green-500' : 'bg-gray-400'
                }`}
              >
                {isRemember ? (
                  <span className="text-white text-sm flex items-center gap-0.5">
                    U<span className="text-lg">•</span>
                    <span className="text-xs">ᴥ</span>
                    <span className="text-lg">•</span>U
                  </span>
                ) : (
                  <span className="text-white text-sm flex items-center gap-0.5">
                    U<span className="text-lg">x</span>
                    <span className="text-xs">ᴥ</span>
                    <span className="text-lg">x</span>U
                  </span>
                )}
              </div>
              <span className="text-white">Запомнить меня</span>
           </label>
            <Link
              className="mt-1"
              href={'/'}
            >
            Нет аккаунта?    
            </Link>
          </div>
          <div className="flex justify-center">
            <button type="submit" className="border-2 rounded-full p-2 w-full cursor-pointer hover:bg-[#98C9A3] transition-all duration-270 ">
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default Login;