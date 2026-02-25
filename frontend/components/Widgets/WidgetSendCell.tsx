import WidgetCellProps from "@/types/WidgetCellProps";

const WidgetSendCell = ({ item }: WidgetCellProps)=> {  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Отправка данных:', item);
  }

  return (
    <form className="flex flex-col p-10 gap-5" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="date">Дата</label>
        <input 
          type="text"
          id="date"
          className="border-2 rounded-lg p-2 w-full focus:outline-none focus:border-[#77BFA3] focus:transition-all duration-300" 
          value={new Date(item.date).toLocaleString()}
          disabled
        />        
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="fullName">ФИО</label>
        <input 
          type="text"
          id="fullName"
          className="border-2 rounded-lg p-2 w-full focus:outline-none focus:border-[#77BFA3] focus:transition-all duration-300" 
          value={item.fullName}
          disabled
        />        
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="enterprise">Организация</label>
        <input 
          type="text"
          id="enterprise"
          className="border-2 rounded-lg p-2 w-full focus:outline-none focus:border-[#77BFA3] focus:transition-all duration-300" 
          value={item.enterprise}
          disabled
        />        
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="phoneNumber">Телефон</label>
        <input 
          type="text"
          id="phoneNumber"
          className="border-2 rounded-lg p-2 w-full focus:outline-none focus:border-[#77BFA3] focus:transition-all duration-300" 
          value={item.phoneNumber}
          disabled
        />        
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="factoryNumbers">Заводской №</label>
        <input 
          type="text"
          id="factoryNumbers"
          className="border-2 rounded-lg p-2 w-full focus:outline-none focus:border-[#77BFA3] focus:transition-all duration-300" 
          value={item.factoryNumbers}
          disabled
        />        
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="typeDevices">Тип устройства</label>
        <input 
          type="text"
          id="typeDevices"
          className="border-2 rounded-lg p-2 w-full focus:outline-none focus:border-[#77BFA3] focus:transition-all duration-300" 
          value={item.typeDevices}
          disabled
        />        
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="email">Email</label>
        <input 
          type="email"
          id="email"
          className="border-2 rounded-lg p-2 w-full focus:outline-none focus:border-[#77BFA3] focus:transition-all duration-300" 
          value={item.email}
          disabled
        />        
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="emotionalColor">Эмоциональный окрас</label>
        <input 
          type="text"
          id="emotionalColor"
          className="border-2 rounded-lg p-2 w-full focus:outline-none focus:border-[#77BFA3] focus:transition-all duration-300" 
          value={item.emotionalСolor === 'positive' ? 'Позитивный' : 
                 item.emotionalСolor === 'negative' ? 'Негативный' : 'Нейтральный'}
          disabled
        />        
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="essenceMatter">Суть вопроса</label>
        <textarea 
          id="essenceMatter"
          rows={4}
          className="border-2 rounded-lg p-2 w-full text-wrap-balance focus:outline-none focus:border-[#77BFA3] focus:transition-all duration-300" 
          value={item.essenceMatter}
          disabled
        />
      </div>

      <div className="flex justify-center mt-5">
        <button 
          type="submit" 
          className="border-2 rounded-full p-2 w-full cursor-pointer hover:bg-[#98C9A3] transition-all duration-270"
        >
          Отправить
        </button>
      </div>
    </form>
  );
};

export default WidgetSendCell;