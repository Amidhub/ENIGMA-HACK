'use client'

import InputFind from "@/components/InputFInd";
import PaginationPages from "@/components/PaginationPages";
import Table from "@/components/Table";
import Modal from "@/components/Widgets/Modal";
import usePages from "@/hooks/usePages";
import useWidget from "@/hooks/useWidget";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Profile from "@/components/Profile";

export default function Home() {
  const {
    showWidgetCreate,
    showWidgetEdit,
    showWidgetExport,
    showWidgetSend,
    setShowWidgetCreate,
    setShowWidgetEdit,
    setShowWidgetExport,
    setShowWidgetSend
  } = useWidget();

  const {
    currentPage,
    pages,
    goNextPage,
    goPrevPage,
    goPagePressPage,
    sortPageDate,
    sortPageEmotial
  } = usePages();

  const router = useRouter();

  // useEffect(() => {
  //   const userId = localStorage.getItem('user_id');
  //   if (!userId) {
  //     router.push('/login');
  //   }
  // }, [])

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-[#EDEDE9] to-[#F5EBE0]">
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-[#D5BDAF] shadow-sm z-10">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#1A1A1A]">
              ENIGMA<span className="text-[#D5BDAF]">-HACK</span>
            </h1>
            <Profile />
          </div>
        </div>
      </header>
      <main className="flex-1 pt-20 pb-4 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-between items-center">
              <InputFind />
              <div className="flex justify-end gap-5">
                <button 
                  className="border-2 rounded-2xl p-2 pr-3 pl-3 bg-[#D5BDAF] text-white cursor-pointer hover:bg-[#F5EBE0] hover:text-[#1A1A1A] transition-all duration-300" 
                  type="button"
                  onClick={() => setShowWidgetCreate(true)}
                >
                  Создать запись
                </button>
                <button 
                  className="border-2 rounded-full p-5 w-10 h-10 flex justify-center items-center border-[#D5BDAF] text-[#1A1A1A] cursor-pointer hover:bg-[#F5EBE0] transition-colors duration-300 ease-in-out animate-export hover:border-[#1A1A1A]" 
                  onClick={() => setShowWidgetExport(true)}
                >
                  ⤓ 
                </button>
              </div>  
            </div>
            
            <Modal 
              showWidgetCreate={showWidgetCreate}
              showWidgetEdit={showWidgetEdit}
              showWidgetExport={showWidgetExport}
              showWidgetSend={showWidgetSend}
              setShowWidgetCreate={setShowWidgetCreate}
              setShowWidgetEdit={setShowWidgetEdit}
              setShowWidgetExport={setShowWidgetExport}
              setShowWidgetSend={setShowWidgetSend}
            />
            
            <div className="bg-white/30 backdrop-blur-sm rounded-xl shadow-lg border border-[#D5BDAF] overflow-hidden">
              <Table 
                setShowWidgetSend={setShowWidgetSend} 
                setShowWidgetEdit={setShowWidgetEdit} 
                sortPageDate={sortPageDate}
                sortPageEmotial={sortPageEmotial}
                currentPage={currentPage}
              />
            </div>
            
            <div className="flex justify-center mt-4">
              <PaginationPages 
                currentPage={currentPage} 
                pages={pages} 
                goNextPage={goNextPage} 
                goPrevPage={goPrevPage} 
                goPagePressPage={goPagePressPage}
              />
            </div>
          </div>
        </div>
      </main>
      <footer className="py-3 text-center text-sm text-[#646360] border-t border-[#D5BDAF] bg-white/50">
        ENIGMA-HACK
      </footer>
    </div>
  );
}