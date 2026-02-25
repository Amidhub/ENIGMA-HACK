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
        <label htmlFor="date">Дата</label>
        <input 
          type="datetime-local"
          id="date"
          name="date"
          className="border-2 rounded-lg p-2 w-full focus:outline-none focus:border-[#77BFA3] focus:transition-all duration-300" 
          value={formData.date.slice(0, 16)}
          onChange={handleChange}
          required
        />        
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="fullName">ФИО</label>
        <input 
          type="text"
          id="fullName"
          name="fullName"
          className="border-2 rounded-lg p-2 w-full focus:outline-none focus:border-[#77BFA3] focus:transition-all duration-300" 
          value={formData.fullName}
          onChange={handleChange}
          required
        />        
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="enterprise">Организация</label>
        <input 
          type="text"
          id="enterprise"
          name="enterprise"
          className="border-2 rounded-lg p-2 w-full focus:outline-none focus:border-[#77BFA3] focus:transition-all duration-300" 
          value={formData.enterprise}
          onChange={handleChange}
          required
        />        
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="phoneNumber">Телефон</label>
        <input 
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          className="border-2 rounded-lg p-2 w-full focus:outline-none focus:border-[#77BFA3] focus:transition-all duration-300" 
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />        
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="factoryNumbers">Заводской номер</label>
        <input 
          type="text"
          id="factoryNumbers"
          name="factoryNumbers"
          className="border-2 rounded-lg p-2 w-full focus:outline-none focus:border-[#77BFA3] focus:transition-all duration-300" 
          value={formData.factoryNumbers}
          onChange={handleChange}
          required
        />        
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="typeDevices">Тип устройства</label>
        <input 
          type="text"
          id="typeDevices"
          name="typeDevices"
          className="border-2 rounded-lg p-2 w-full focus:outline-none focus:border-[#77BFA3] focus:transition-all duration-300" 
          value={formData.typeDevices}
          onChange={handleChange}
          required
        />        
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="email">Email</label>
        <input 
          type="email"
          id="email"
          name="email"
          className="border-2 rounded-lg p-2 w-full focus:outline-none focus:border-[#77BFA3] focus:transition-all duration-300" 
          value={formData.email}
          onChange={handleChange}
          required
        />        
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="emotionalСolor">Эмоциональный окрас</label>
        <select
          id="emotionalСolor"
          name="emotionalСolor"
          className="border-2 rounded-lg p-2 w-full focus:outline-none focus:border-[#77BFA3] focus:transition-all duration-300"
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
        <label htmlFor="essenceMatter">Суть вопроса</label>
        <textarea 
          id="essenceMatter"
          name="essenceMatter"
          rows={4}
          className="border-2 rounded-lg p-2 w-full text-wrap-balance focus:outline-none focus:border-[#77BFA3] focus:transition-all duration-300" 
          value={formData.essenceMatter}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex justify-center mt-5">
        <button 
          type="submit" 
          className="border-2 rounded-full p-2 w-full cursor-pointer hover:bg-[#98C9A3] transition-all duration-270"
        >
          Создать запись
        </button>
      </div>
    </form>
  );
};

export default WidgetCreateTicket;