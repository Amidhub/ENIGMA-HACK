'use client'

import useAuth from "@/hooks/useAuth";

const Login = () => {
  const {
    userLogin,
    userPassword,
    setUserLogin,
    setUsetPassword,
    handleAuth
  } = useAuth();

  return (
    <div className="flex justify-center items-center h-screen p-2 bg-linear-to-b from-[#EDEDE9] to-[#D5BDAF]">
      <div className="flex justify-center p-20">
        <form className="flex flex-col p-10 rounded-2xl gap-6 w-96 max-w-md bg-white/30 backdrop-blur-md border-2 border-[#D5BDAF] shadow-xl" onSubmit={handleAuth}>
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="input-login" className="text-[#1A1A1A] font-medium">Логин</label>
              <input 
                value={userLogin}
                onChange={(e) => setUserLogin(e.target.value)}
                type="text" 
                className="border-2 border-[#D5BDAF] rounded-lg p-2 w-full focus:outline-none focus:border-[#1A1A1A] focus:ring-2 focus:ring-[#D5BDAF]/20 bg-[#F5EBE0] text-[#1A1A1A] placeholder:text-[#646360]/50 transition-all duration-300" 
                id="input-login" 
                placeholder="Введите логин"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="input-password" className="text-[#1A1A1A] font-medium">Пароль</label>
              <input 
                type="password" 
                value={userPassword}
                onChange={(e) => setUsetPassword(e.target.value)}
                className="border-2 border-[#D5BDAF] rounded-lg p-2 w-full focus:outline-none focus:border-[#1A1A1A] focus:ring-2 focus:ring-[#D5BDAF]/20 bg-[#F5EBE0] text-[#1A1A1A] placeholder:text-[#646360]/50 transition-all duration-300" 
                id="input-password" 
                placeholder="Введите пароль"
              />
            </div>
          </div>          
          <div className="flex justify-center">
            <button 
              type="submit" 
              className="border-2 border-[#D5BDAF] rounded-full p-2 w-full cursor-pointer hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] transition-all duration-300 bg-[#D5BDAF] text-[#1A1A1A] font-medium"
            >
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;