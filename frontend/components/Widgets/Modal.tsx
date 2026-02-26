'use client' 

import WidgetCreateTicket from "@/components/Widgets/WidgetCreateTicket";
import WidgetExportFile from "@/components/Widgets/WidgetExportFile";
import WidgetSendCell from "@/components/Widgets/WidgetSendCell";
import WidgetEditCell from "@/components/Widgets/WidgetEditCell";
import useTable from "@/hooks/useTable";

interface ModalProps {
  showWidgetCreate: boolean;
  showWidgetExport: boolean;
  showWidgetEdit: boolean;
  showWidgetSend: boolean;
  setShowWidgetCreate: (val: boolean) => void;
  setShowWidgetExport: (val: boolean) => void;
  setShowWidgetSend: (val: boolean) => void;
  setShowWidgetEdit: (val: boolean) => void;
  setItems: (val: boolean) => void;
}

const Modal = ({ 
  showWidgetCreate, 
  showWidgetExport,
  showWidgetEdit,
  showWidgetSend,
  setShowWidgetEdit,
  setShowWidgetSend,
  setShowWidgetCreate,
  setShowWidgetExport,
  setItems,
} : ModalProps) => {
  const {
    currentCell,
    items,
    handleSaveEditedAnswer,
    handleSendAnswer,
    createTicket,
  } = useTable();

  const modalClass = "fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-[opacity,visibility] duration-300 ease-in-out";
  const contentClass = "bg-[#F5EBE0] border border-[#D5BDAF] rounded-2xl shadow-xl min-w-75 max-w-125 w-[90%] max-h-[90vh] overflow-y-auto text-[#1A1A1A]";

  return (
    <>
      <div className={`${modalClass} ${showWidgetExport ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setShowWidgetExport(false)}>
        <div className={contentClass} onClick={e => e.stopPropagation()}>
          <WidgetExportFile 
            items={items}
            OnClick={() => {
              setShowWidgetExport(false)
            }}
          />
        </div>
      </div>

      <div className={`${modalClass} ${showWidgetCreate ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setShowWidgetCreate(false)}>
        <div className={contentClass} onClick={e => e.stopPropagation()}>
          <WidgetCreateTicket 
            OnClick={(item) => {
              createTicket(item, () => setShowWidgetCreate(false));
            }}
          />
        </div>
      </div>

      <div className={`${modalClass} ${showWidgetEdit ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setShowWidgetEdit(false)}>
        <div className={contentClass} onClick={e => e.stopPropagation()}>
          <WidgetEditCell 
            item={currentCell}
            OnClick={(id, answer) => {
              handleSaveEditedAnswer(id, answer, () => setShowWidgetEdit(false));
            }}
          />
        </div>
      </div>

      <div className={`${modalClass} ${showWidgetSend ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setShowWidgetSend(false)}>
        <div className={contentClass} onClick={e => e.stopPropagation()}>
          <WidgetSendCell 
            item={currentCell}
            OnClick={() => {
              handleSendAnswer(() => setShowWidgetSend(false));
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Modal;