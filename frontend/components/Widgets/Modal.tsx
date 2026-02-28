'use client' 

import WidgetCreateTicket from "@/components/Widgets/WidgetCreateTicket";
import WidgetExportFile from "@/components/Widgets/WidgetExportFile";
import WidgetSendCell from "@/components/Widgets/WidgetSendCell";
import WidgetEditCell from "@/components/Widgets/WidgetEditCell";
import { useTicketStore } from "@/store/useTicketStore";
import CellTableProps from "@/types/CellTableProps";
import { useNotification } from "@/hooks/useNotification";

interface ModalProps {
  showWidgetCreate: boolean;
  showWidgetExport: boolean;
  showWidgetEdit: boolean;
  showWidgetSend: boolean;
  setShowWidgetCreate: (val: boolean) => void;
  setShowWidgetExport: (val: boolean) => void;
  setShowWidgetSend: (val: boolean) => void;
  setShowWidgetEdit: (val: boolean) => void;
}

const Modal = ({ 
  showWidgetCreate, 
  showWidgetExport,
  showWidgetEdit,
  showWidgetSend,
  setShowWidgetEdit,
  setShowWidgetSend,
  setShowWidgetCreate,
  setShowWidgetExport 
} : ModalProps) => {
  const { addNotification } = useNotification();
  
  const { tickets, currentTicket, addTicket, updateTicket } = useTicketStore();

  const modalClass = "fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-[opacity,visibility] duration-300 ease-in-out";
  const contentClass = "bg-[#F5EBE0] border border-[#D5BDAF] rounded-2xl shadow-xl min-w-75 max-w-125 w-[90%] max-h-[90vh] overflow-y-auto text-[#1A1A1A]";
  
  return (
    <>
      <div className={`${modalClass} ${showWidgetExport ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setShowWidgetExport(false)}>
        <div className={contentClass} onClick={e => e.stopPropagation()}>
          <WidgetExportFile 
            items={tickets}
            OnClick={() => setShowWidgetExport(false)}
          />
        </div>
      </div>

      <div className={`${modalClass} ${showWidgetCreate ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setShowWidgetCreate(false)}>
        <div className={contentClass} onClick={e => e.stopPropagation()}>
          <WidgetCreateTicket 
            OnClick={(item) => {
              const nextId = tickets.length > 0 ? Math.max(...tickets.map(t => t.id as number)) + 1 : 1;
              addTicket({ ...item, id: nextId });
              setShowWidgetCreate(false);
              addNotification('success', 'Тикет успешно создан')
            }}
          />
        </div>
      </div>

      <div className={`${modalClass} ${showWidgetEdit ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setShowWidgetEdit(false)}>
        <div className={contentClass} onClick={e => e.stopPropagation()}>
          <WidgetEditCell 
            item={currentTicket as CellTableProps}
            OnClick={(id, updatedItem) => {
              updateTicket(id, updatedItem)
              setShowWidgetEdit(false);
            }}
          />
        </div>
      </div>

      <div className={`${modalClass} ${showWidgetSend ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setShowWidgetSend(false)}>
        <div className={contentClass} onClick={e => e.stopPropagation()}>
          <WidgetSendCell 
            item={currentTicket as CellTableProps}
            OnClick={() => {
              setShowWidgetSend(false);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Modal;