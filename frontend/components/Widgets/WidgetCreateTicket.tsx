import WidgetCellCreateProps from "@/types/WidgetCellCreateProps";
import { useState } from "react";
import CellTableProps from "@/types/CellTableProps";

const WidgetCreateTicket = ({ OnClick }: WidgetCellCreateProps ) => {
  const [formData, setFormData] = useState<CellTableProps>({
    date: new Date().toISOString(),
    fullName: '',
    enterprise: '',
    phoneNumber: '',
    factoryNumbers: '',
    typeDevices: '',
    email: '',
    emotionalСolor: 'neutral',
    essenceMatter: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    OnClick(formData);
  }

  return (
    <form className="flex flex-col p-10 gap-5" onSubmit={handleCreateSubmit}>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="date" className="text-[#1A1A1A]">Дата</label>
        <input 
          type="datetime-local"
          id="date"
          name="date"
          className="border-2 border-[#D5BDAF] rounded-lg p-2 w-full focus:outline-none focus:border-[#D5BDAF] focus:ring-2 focus:ring-[#D5BDAF]/20 bg-[#F5EBE0] text-[#1A1A1A]" 
          value={formData.date.slice(0, 16)}
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

      <div className="flex justify-center mt-5">
        <button 
          type="submit" 
          className="border-2 rounded-full p-2 w-full cursor-pointer hover:bg-[#EDEDE9] hover:text-[#1A1A1A] transition-all duration-270 bg-[#D5BDAF] text-white"
        >
          Создать запись
        </button>
      </div>
    </form>
  );
};

export default WidgetCreateTicket;