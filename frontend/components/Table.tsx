import CellTableProps from "@/types/CellTableProps";
import TableProps from "@/types/TableProps";

export default function Table({ items, setShowWidgetEdit, setShowWidgetSend, setCurrentCell }: TableProps) {
  const handleCurrentCellEdit = (item: CellTableProps, type: 'send' | 'edit') => {
    setCurrentCell(item)
    if (type === 'send') {
      setShowWidgetSend(true);
      return;
    }
    setShowWidgetEdit(true);
  }

  return (
    <div className="rounded-xl overflow-hidden border border-[#BFD8BD] shadow-sm">
      <table className="w-full border-collapse">
        <thead className="bg-[#77BFA3] text-white uppercase text-sm">
          <tr>
            <th className="p-3 text-left">Дата</th>
            <th className="p-3 text-left">ФИО</th>
            <th className="p-3 text-left">Организация</th>
            <th className="p-3 text-left">Телефон</th>
            <th className="p-3 text-left">Заводской №</th>
            <th className="p-3 text-left">Тип устройства</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Эмоция</th>
            <th className="p-3 text-left">Суть вопроса</th>
            <th className="p-3 text-left">Действие</th>
          </tr>
        </thead>
        <tbody>
          {items.map(( item ) => (
            <tr key={item.id} className="animate-table">
              <td className="p-3 border-b border-[#BFD8BD]">{new Date(item.date).toLocaleString()}</td>              
              <td className="p-3 border-b border-[#BFD8BD] max-w-xs wrap-break-words">{item.fullName}</td>        
              <td className="p-3 border-b border-[#BFD8BD]">{item.enterprise}</td>          
              <td className="p-3 border-b border-[#BFD8BD] max-w-xs wrap-break-words">{item.phoneNumber}</td>    
              <td className="p-3 border-b border-[#BFD8BD]">{item.factoryNumbers}</td>     
              <td className="p-3 border-b border-[#BFD8BD] max-w-xs wrap-break-words">{item.typeDevices}</td>    
              <td className="p-3 border-b border-[#BFD8BD]">{item.email}</td>        
              <td className="p-3 border-b border-[#BFD8BD]">{item.emotionalСolor}</td>        
              <td className="p-3 border-b border-[#BFD8BD] max-w-md wrap-break-words">{item.essenceMatter}</td>  
              <td className="p-3 border-b border-[#BFD8BD]">                                
                <div className="flex gap-2">
                  <button type="button" className="bg-[#77BFA3] text-white px-3 py-1 rounded-md cursor-pointer hover:bg-[#98C9A3]" onClick={() => handleCurrentCellEdit(item, 'send')}>
                    ✓
                  </button>
                  <button type="button" className="bg-[#BFD8BD] text-gray-700 px-3 py-1 rounded-md cursor-pointer hover:bg-[#DDE7C7]" onClick={() => handleCurrentCellEdit(item, 'edit')}>
                    ✎
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
