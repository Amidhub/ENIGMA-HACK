import WidgetCellProps from "@/types/WidgetCellProps";

const WidgetSendCell = ({ item }: WidgetCellProps)=> {  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Отправка данных:', item);
  }

  return (
    <form className="flex flex-col p-10 gap-5" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="date" className="text-[#1A1A1A]">Дата</label>
        <input 
          type="text"
          id="date"
          className="border-2 border-[#D5BDAF] rounded-lg p-2 w-full focus:outline-none bg-[#F5EBE0] text-[#1A1A1A]" 
          value={new Date(item.date).toLocaleString()}
          disabled
        />        
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="fullName" className="text-[#1A1A1A]">ФИО</label>
        <input 
          type="text"
          id="fullName"
          className="border-2 border-[#D5BDAF] rounded-lg p-2 w-full focus:outline-none bg-[#F5EBE0] text-[#1A1A1A]" 
          value={item.fullName}
          disabled
        />        
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="enterprise" className="text-[#1A1A1A]">Организация</label>
        <input 
          type="text"
          id="enterprise"
          className="border-2 border-[#D5BDAF] rounded-lg p-2 w-full focus:outline-none bg-[#F5EBE0] text-[#1A1A1A]" 
          value={item.enterprise}
          disabled
        />        
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="phoneNumber" className="text-[#1A1A1A]">Телефон</label>
        <input 
          type="text"
          id="phoneNumber"
          className="border-2 border-[#D5BDAF] rounded-lg p-2 w-full focus:outline-none bg-[#F5EBE0] text-[#1A1A1A]" 
          value={item.phoneNumber}
          disabled
        />        
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="factoryNumbers" className="text-[#1A1A1A]">Заводской №</label>
        <input 
          type="text"
          id="factoryNumbers"
          className="border-2 border-[#D5BDAF] rounded-lg p-2 w-full focus:outline-none bg-[#F5EBE0] text-[#1A1A1A]" 
          value={item.factoryNumbers}
          disabled
        />        
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="typeDevices" className="text-[#1A1A1A]">Тип устройства</label>
        <input 
          type="text"
          id="typeDevices"
          className="border-2 border-[#D5BDAF] rounded-lg p-2 w-full focus:outline-none bg-[#F5EBE0] text-[#1A1A1A]" 
          value={item.typeDevices}
          disabled
        />        
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="email" className="text-[#1A1A1A]">Email</label>
        <input 
          type="email"
          id="email"
          className="border-2 border-[#D5BDAF] rounded-lg p-2 w-full focus:outline-none bg-[#F5EBE0] text-[#1A1A1A]" 
          value={item.email}
          disabled
        />        
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="emotionalColor" className="text-[#1A1A1A]">Эмоциональный окрас</label>
        <input 
          type="text"
          id="emotionalColor"
          className="border-2 border-[#D5BDAF] rounded-lg p-2 w-full focus:outline-none bg-[#F5EBE0] text-[#1A1A1A]" 
          value={item.emotionalСolor === 'positive' ? '😊 Позитивный' : 
                item.emotionalСolor === 'negative' ? '😠 Негативный' : '😐 Нейтральный'}
          disabled
        />        
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="essenceMatter" className="text-[#1A1A1A]">Суть вопроса</label>
        <textarea 
          id="essenceMatter"
          rows={4}
          className="border-2 border-[#D5BDAF] rounded-lg p-2 w-full text-wrap-balance focus:outline-none bg-[#F5EBE0] text-[#1A1A1A]" 
          value={item.essenceMatter}
          disabled
        />
      </div>

      <div className="flex justify-center mt-5">
        <button 
          type="submit" 
          className="border-2 rounded-full p-2 w-full cursor-pointer hover:bg-[#EDEDE9] hover:text-[#1A1A1A] transition-all duration-270 bg-[#D5BDAF] text-white"
        >
          Отправить
        </button>
      </div>
    </form>
  );
};

export default WidgetSendCell;