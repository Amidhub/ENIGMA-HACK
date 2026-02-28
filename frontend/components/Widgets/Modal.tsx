'use client' 

import WidgetCreateTicket from "@/components/Widgets/WidgetCreateTicket";
import WidgetExportFile from "@/components/Widgets/WidgetExportFile";
import WidgetSendCell from "@/components/Widgets/WidgetSendCell";
import WidgetEditCell from "@/components/Widgets/WidgetEditCell";
import { useTicketStore } from "@/store/useTicketStore";
import CellTableProps from "@/types/CellTableProps";
import { useNotification } from "@/hooks/useNotification";
import addTicketApi from "@/api/tickets/addTicketApi";
import sendEmail from "@/api/sendEmail";
import updateTicketApi from "@/api/tickets/updateTicketApi";
import checkStatus from "@/api/tickets/checkStatus";
import updateStatus from "@/api/tickets/updateStatus";

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

  const handleCreateTicket = async (item: CellTableProps) => {
    const data = await addTicketApi(item);
    if (!data.success) {
      addNotification('error', data.msg)
      return null;
    }
    const nextId = tickets.length > 0 ? Math.max(...tickets.map(t => t.id as number)) + 1 : 1;
    addTicket({ ...item, id: nextId });
    setShowWidgetCreate(false);
    addNotification('success', 'Тикет успешно создан')
  }

  const handleSendTicket = async (ticket: CellTableProps) => {
    const data = await sendEmail(ticket.id, ticket.email, ticket.llmAnswer ,);
    if (!data.success) {
      addNotification('error', data.msg)
      return null;
    }
    const nextId = tickets.length > 0 ? Math.max(...tickets.map(t => t.id as number)) + 1 : 1;
    addTicket({ ...ticket, id: nextId });
    setShowWidgetSend(false);    
    addNotification('success', 'Тикет успешно создан')
  }

  const handleUpdateTicket = async (ticket: CellTableProps) => {
    const checkStatusTicket = await checkStatus(ticket);
    if (checkStatusTicket.status === 'in_progress') {
      addNotification('warning', 'Тикет занят')
      return null;
    }
    const updateStatusTicket = await updateStatus(ticket);
    if (!updateStatusTicket.success) {
      addNotification('error', 'Произошла ошибка');
      return null;
    }
    const data = await updateTicketApi(ticket);
    if (!data.success) {
      addNotification('error', data.msg)
      return null;
    }
    updateTicket(ticket.id, ticket)
    setShowWidgetEdit(false);
    addNotification('success', 'Тикет успешно изменен')
  }

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
            OnClick={handleCreateTicket}
          />
        </div>
      </div>

      <div className={`${modalClass} ${showWidgetEdit ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setShowWidgetEdit(false)}>
        <div className={contentClass} onClick={e => e.stopPropagation()}>
          <WidgetEditCell 
            item={currentTicket as CellTableProps}
            OnClick={handleUpdateTicket}
          />
        </div>
      </div>

      <div className={`${modalClass} ${showWidgetSend ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setShowWidgetSend(false)}>
        <div className={contentClass} onClick={e => e.stopPropagation()}>
          <WidgetSendCell 
            item={currentTicket as CellTableProps}
            OnClick={handleSendTicket}
          />
        </div>
      </div>
    </>
  );
};

export default Modal;