import WidgetCellProps from "@/types/WidgetCellProps";
import { useState } from "react";

const WidgetEditCell = ({ item, OnClick }: WidgetCellProps )=> {
  const [editedAnswer, setEditedAnswer] = useState<string>(item?.essenceMatter);
  
  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (OnClick && item?.id) {
      OnClick(item.id, editedAnswer);
    }
  }

  return (
    <form className="flex flex-col p-10 gap-10" onSubmit={handleEditSubmit}>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="input-edit">Ответ</label>
        <textarea 
          id="input-edit"
          rows={5}
          className="border-2 rounded-lg p-2 w-full focus:outline-none focus:border-[#D5BDAF] focus:transition-all duration-300" 
          value={editedAnswer}
          onChange={(e) => setEditedAnswer(e.target.value)}
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