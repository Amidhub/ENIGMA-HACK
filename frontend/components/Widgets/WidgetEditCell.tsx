import checkStatus from "@/api/tickets/checkStatus";
import updateStatus from "@/api/tickets/updateStatus";
import { useNotification } from "@/hooks/useNotification";
import CellTableProps from "@/types/CellTableProps";
import WidgetCellProps from "@/types/WidgetCellProps";
import { useEffect, useState } from "react";

const WidgetEditCell = ({ item, OnClick }: WidgetCellProps )=> {
  const { addNotification } = useNotification();
  
  const [formData, setFormData] = useState<CellTableProps>({
    date: '',
    fullName: '',
    enterprise: '',
    phoneNumber: '',
    factoryNumbers: '',
    typeDevices: '',
    email: '',
    emotionalСolor: 'neutral',
    essenceMatter: '',
    llmAnswer: '',
  });


  const checkTicket = async () => { 
    if (!item?.id) return;

    const checkStatusTicket = await checkStatus(item);
    if (checkStatusTicket.status === 'in_progress') {
      addNotification('warning', 'Тикет занят');
      return null;
    }

    const updateStatusTicket = await updateStatus(item);
    if (!updateStatusTicket.status) {
      return null;
    }
  }

  useEffect(() => {
    if (item) {
      setFormData({
        date: item.date?.slice(0, 16) || '',
        fullName: item.fullName || '',
        enterprise: item.enterprise || '',
        phoneNumber: item.phoneNumber || '',
        factoryNumbers: item.factoryNumbers || '',
        typeDevices: item.typeDevices || '',
        email: item.email || '',
        emotionalСolor: item.emotionalСolor || 'neutral',
        essenceMatter: item.essenceMatter || '',
        llmAnswer: item.llmAnswer || '',
      });
    }
    checkTicket();

  }, [item]);
  
 
  if (!item) {
    return <div>Загрузка...</div>;
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedItem = {
      ...item,
      ...formData
    };
    
    if (OnClick && item?.id) {
      OnClick(updatedItem); 
    }
  }

  return (
    <form className="flex flex-col p-10 gap-10" onSubmit={handleEditSubmit}>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="date" className="text-[#1A1A1A]">Дата</label>
        <input 
          type="datetime-local"
          id="date"
          name="date"
          className="border-2 border-[#D5BDAF] rounded-lg p-2 w-full focus:outline-none focus:border-[#D5BDAF] focus:ring-2 focus:ring-[#D5BDAF]/20 bg-[#F5EBE0] text-[#1A1A1A]" 
          value={formData.date}
          onChange={handleChange}
          required
        />        
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="fullName" className="text-[#1A1A1A]">ФИО</label>
        <input 
          type="text"
          id="fullName"
          name="fullName"
          className="border-2 border-[#D5BDAF] rounded-lg p-2 w-full focus:outline-none focus:border-[#D5BDAF] focus:ring-2 focus:ring-[#D5BDAF]/20 bg-[#F5EBE0] text-[#1A1A1A]" 
          value={formData.fullName}
          onChange={handleChange}
          required
        />        
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="enterprise" className="text-[#1A1A1A]">Организация</label>
        <input 
          type="text"
          id="enterprise"
          name="enterprise"
          className="border-2 border-[#D5BDAF] rounded-lg p-2 w-full focus:outline-none focus:border-[#D5BDAF] focus:ring-2 focus:ring-[#D5BDAF]/20 bg-[#F5EBE0] text-[#1A1A1A]" 
          value={formData.enterprise}
          onChange={handleChange}
          required
        />        
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="phoneNumber" className="text-[#1A1A1A]">Телефон</label>
        <input 
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          className="border-2 border-[#D5BDAF] rounded-lg p-2 w-full focus:outline-none focus:border-[#D5BDAF] focus:ring-2 focus:ring-[#D5BDAF]/20 bg-[#F5EBE0] text-[#1A1A1A]" 
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />        
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="factoryNumbers" className="text-[#1A1A1A]">Заводской номер</label>
        <input 
          type="text"
          id="factoryNumbers"
          name="factoryNumbers"
          className="border-2 border-[#D5BDAF] rounded-lg p-2 w-full focus:outline-none focus:border-[#D5BDAF] focus:ring-2 focus:ring-[#D5BDAF]/20 bg-[#F5EBE0] text-[#1A1A1A]" 
          value={formData.factoryNumbers}
          onChange={handleChange}
          required
        />        
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="typeDevices" className="text-[#1A1A1A]">Тип устройства</label>
        <input 
          type="text"
          id="typeDevices"
          name="typeDevices"
          className="border-2 border-[#D5BDAF] rounded-lg p-2 w-full focus:outline-none focus:border-[#D5BDAF] focus:ring-2 focus:ring-[#D5BDAF]/20 bg-[#F5EBE0] text-[#1A1A1A]" 
          value={formData.typeDevices}
          onChange={handleChange}
          required
        />        
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="email" className="text-[#1A1A1A]">Email</label>
        <input 
          type="email"
          id="email"
          name="email"
          className="border-2 border-[#D5BDAF] rounded-lg p-2 w-full focus:outline-none focus:border-[#D5BDAF] focus:ring-2 focus:ring-[#D5BDAF]/20 bg-[#F5EBE0] text-[#1A1A1A]" 
          value={formData.email}
          onChange={handleChange}
          required
        />        
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="emotionalСolor" className="text-[#1A1A1A]">Эмоциональный окрас</label>
        <select
          id="emotionalСolor"
          name="emotionalСolor"
          className="border-2 border-[#D5BDAF] rounded-lg p-2 w-full focus:outline-none focus:border-[#D5BDAF] focus:ring-2 focus:ring-[#D5BDAF]/20 bg-[#F5EBE0] text-[#1A1A1A]"
          value={formData.emotionalСolor}
          onChange={handleChange}
          required
        >
          <option value="positive">Позитивный</option>
          <option value="neutral">Нейтральный</option>
          <option value="negative">Негативный</option>
        </select>
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="essenceMatter" className="text-[#1A1A1A]">Суть вопроса</label>
        <textarea 
          id="essenceMatter"
          name="essenceMatter"
          rows={4}
          className="border-2 border-[#D5BDAF] rounded-lg p-2 w-full text-wrap-balance focus:outline-none focus:border-[#D5BDAF] focus:ring-2 focus:ring-[#D5BDAF]/20 bg-[#F5EBE0] text-[#1A1A1A]" 
          value={formData.essenceMatter}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="llmAnswer" className="text-[#1A1A1A]">Ответ нейросети</label>
        <textarea 
          id="llmAnswer"
          name="llmAnswer"
          rows={4}
          className="border-2 border-[#D5BDAF] rounded-lg p-2 w-full text-wrap-balance focus:outline-none focus:border-[#D5BDAF] focus:ring-2 focus:ring-[#D5BDAF]/20 bg-[#F5EBE0] text-[#1A1A1A]" 
          value={formData.llmAnswer}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="flex justify-center">
        <button 
          type="submit" 
          className="border-2 rounded-full p-2 w-full cursor-pointer hover:bg-[#EDEDE9] hover:text-[#1A1A1A] transition-all duration-270 bg-[#D5BDAF] text-white"
        >
          Сохранить
        </button>
      </div>
    </form>
  );
};

export default WidgetEditCell;