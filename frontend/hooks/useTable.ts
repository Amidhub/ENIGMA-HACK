import { useTicketStore } from "@/store/useTicketStore";
// import sendAnswer from "@/api/tickets/sendAnswer";
import CellTableProps from "@/types/CellTableProps";
import useWidget from "@/hooks/useWidget"; 

const useTable = () => {
  const { 
    tickets, 
    currentTicket, 
    // setTickets,
    setCurrentTicket,
    addTicket,
    // updateTicket 
  } = useTicketStore();

  const { 
    setShowWidgetEdit, 
    // setShowWidgetSend, 
    setShowWidgetCreate 
  } = useWidget();

  const handleSaveEditedAnswer = (id: number, editedAnswer: string) => {
    // updateTicket(id, {}); 
    alert('Ответ успешно изменен');
    setShowWidgetEdit(false); 
  }

  const handleSendAnswer = async () => {
    // try {
    //   const data = await sendAnswer(currentTicket);
    //   if (data.success) {
    //     setShowWidgetSend(false);
    //   }
    // } catch (error) {
    //   console.error(error); 
    // }
  }

  const createTicket = (ticket: CellTableProps) => {
    try {
      const nextId = tickets.length > 0 
        ? Math.max(...tickets.map(t => t.id as number)) + 1 
        : 1;
      
      addTicket({ ...ticket, id: nextId });
      
      setShowWidgetCreate(false);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    items: tickets,        
    currentCell: currentTicket,
    setCurrentCell: setCurrentTicket,
    createTicket,
    handleSaveEditedAnswer,
    handleSendAnswer,
  }
};

export default useTable;