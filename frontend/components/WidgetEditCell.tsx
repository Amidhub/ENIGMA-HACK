import WidgetEditCellProps from "@/types/WidgetEditCellProps";
import { useState } from "react";

const WidgetEditCell = ({ item, onSave }: WidgetEditCellProps )=> {
  console.log(item);
  
  const [editedAnswer, setEditedAnswer] = useState<string>(() => {
    if (item) {
      return item.llmAnswer
    }
    return '';
  })  
  
  const handleEditSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (item?.llmAnswer) {
      onSave(item.id, editedAnswer);
    }
  }

  return (
    <form className="flex flex-col p-10 gap-10" onSubmit={handleEditSubmit}>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="input-edit">Ответ</label>
        <input 
          type="text"
          id="input-edit"
          className="border-2 rounded-lg p-2 w-full focus:outline-none focus:border-[#77BFA3] focus:transition-all duration-300" 
          value={editedAnswer}
          onChange={(e) => setEditedAnswer(e.target.value)}
        />        
      </div>
       <div className="flex justify-center">
        <button 
          type="submit" 
          className="border-2 rounded-full p-2 w-full cursor-pointer hover:bg-[#98C9A3] transition-all duration-270 "
          >
          Сохранить
        </button>
      </div>
    </form>
  );
};

export default WidgetEditCell;

