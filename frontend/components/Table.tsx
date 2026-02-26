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
    <div className="rounded-xl overflow-hidden border border-[#D5BDAF] shadow-sm">
      <table className="w-full border-collapse">
        <thead className="bg-[#D5BDAF] text-white uppercase text-sm">
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
          {items.map((item, index) => (
            <tr 
              key={item.id} 
              className={index % 2 === 0 ? 'bg-[#F5EBE0]' : 'bg-white'}
            >
              <td className="p-3 border-b border-[#D5BDAF] text-[#1A1A1A]">{new Date(item.date).toLocaleString()}</td>              
              <td className="p-3 border-b border-[#D5BDAF] max-w-xs wrap-break-words text-[#1A1A1A]">{item.fullName}</td>        
              <td className="p-3 border-b border-[#D5BDAF] text-[#1A1A1A]">{item.enterprise}</td>          
              <td className="p-3 border-b border-[#D5BDAF] max-w-xs wrap-break-words text-[#1A1A1A]">{item.phoneNumber}</td>    
              <td className="p-3 border-b border-[#D5BDAF] text-[#1A1A1A]">{item.factoryNumbers}</td>     
              <td className="p-3 border-b border-[#D5BDAF] max-w-xs wrap-break-words text-[#1A1A1A]">{item.typeDevices}</td>    
              <td className="p-3 border-b border-[#D5BDAF] text-[#1A1A1A]">{item.email}</td>        
              <td className="p-3 border-b border-[#D5BDAF]">
                <span className={
                  item.emotionalСolor === 'positive' ? 'text-green-600 font-bold' :
                  item.emotionalСolor === 'negative' ? 'text-red-600 font-bold' :
                  'text-[#1A1A1A]'
                }>
                  {item.emotionalСolor}
                </span>
              </td>        
              <td className="p-3 border-b border-[#D5BDAF] max-w-md wrap-break-words text-[#1A1A1A]">{item.essenceMatter}</td>  
              <td className="p-3 border-b border-[#D5BDAF]">                                
                <div className="flex gap-2">
                  <button 
                    type="button" 
                    className="bg-[#D5BDAF] text-white px-3 py-1 rounded-md cursor-pointer hover:bg-[#EDEDE9] hover:text-[#1A1A1A] transition-colors" 
                    onClick={() => handleCurrentCellEdit(item, 'send')}
                  >
                    ✓
                  </button>
                  <button 
                    type="button" 
                    className="bg-[#F5EBE0] text-[#1A1A1A] px-3 py-1 rounded-md cursor-pointer hover:bg-[#EDEDE9] hover:text-[#1A1A1A] transition-colors" 
                    onClick={() => handleCurrentCellEdit(item, 'edit')}
                  >
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
