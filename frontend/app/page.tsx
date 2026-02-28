'use client'
import InputFind from "@/components/InputFInd";
import PaginationPages from "@/components/PaginationPages";
import Table from "@/components/Table";
import Modal from "@/components/Widgets/Modal";
import usePagination from "@/hooks/usePagination";
import useWidget from "@/hooks/useWidget";

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
  } = usePagination();

  return (
    <div className="flex justify-center pt-20 h-screen p-4 animate-home">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between">
          <InputFind/>
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
        <Table setShowWidgetSend={setShowWidgetSend} setShowWidgetEdit={setShowWidgetEdit} currentPage={currentPage}/>
        <PaginationPages  currentPage={currentPage} pages={pages} goNextPage={goNextPage} goPrevPage={goPrevPage} goPagePressPage={goPagePressPage}/>
      </div>
    </div>
  );
}