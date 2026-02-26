'use client'
import Table from "@/components/Table";
import Modal from "@/components/Widgets/Modal";
import useWidget from "@/hooks/useWidget";
import useTable from "@/hooks/useTable";  // ← только здесь!

export default function Home() {
  const {
    showWidgetSend,
    setShowWidgetEdit,
    setShowWidgetSend,
    showWidgetCreate,
    showWidgetEdit,
    showWidgetExport,
    setShowWidgetCreate,
    setShowWidgetExport,
  } = useWidget();
  
  // Все данные из одного хука!
  const { 
    items, 
    currentCell,
    setCurrentCell,
    createTicket,           // ← получаем функцию
    handleSaveEditedAnswer, // ← получаем функцию
    handleSendAnswer        // ← получаем функцию
  } = useTable();

  return (
    <div className="...">
      <Table 
        items={items}
        setCurrentCell={setCurrentCell}
        setShowWidgetEdit={setShowWidgetEdit}
        setShowWidgetSend={setShowWidgetSend}
      />
      
      <Modal  
      items={items}
        currentCell={currentCell}
        showWidgetEdit={showWidgetEdit}
        showWidgetSend={showWidgetSend}
        showWidgetCreate={showWidgetCreate}
        showWidgetExport={showWidgetExport}
        setShowWidgetCreate={setShowWidgetCreate}
        setShowWidgetExport={setShowWidgetExport}
        setShowWidgetEdit={setShowWidgetEdit}
        setShowWidgetSend={setShowWidgetSend}
        // Передаем функции в модалку
        createTicket={createTicket}
        handleSaveEditedAnswer={handleSaveEditedAnswer}
        handleSendAnswer={handleSendAnswer}
      />
    </div>
  );
}