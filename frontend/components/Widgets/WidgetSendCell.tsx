import WidgetCellProps from "@/types/WidgetCellProps";

const WidgetSendCell = ({ item }: WidgetCellProps )=> {  
  const handleEditSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    
  }

  return (
    <form className="flex flex-col p-10 gap-5" onSubmit={handleEditSubmit}>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="input-edit">Email</label>
        <input 
          type="text"
          id="input-edit"
          className="border-2 rounded-lg p-2 w-full focus:outline-none focus:border-[#77BFA3] focus:transition-all duration-300" 
          value={item.email}
          disabled
        />        
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="input-edit">Вопрос</label>
        <input 
          type="text"
          id="input-edit"
          className="border-2 rounded-lg p-2 w-full focus:outline-none focus:border-[#77BFA3] focus:transition-all duration-300" 
          value={item.question}
          disabled
        />        
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="input-edit">Ответ</label>
        <textarea 
          id="input-edit"
          rows={5}
          className="border-2 rounded-lg p-2 w-full text-wrap-balance focus:outline-none focus:border-[#77BFA3] focus:transition-all duration-300" 
          value={item.llmAnswer}
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

