import useTable from "@/hooks/useTable";
import CellTableProps from "@/types/CellTableProps";
import TableProps from "@/types/TableProps";

export default function Table({
  items,
  setShowWidgetEdit,
  setShowWidgetSend,
  setCurrentCell  
}: TableProps) {

  const handleCurrentCellEdit = (item: CellTableProps, type: 'send' | 'edit') => {
    setCurrentCell(item)
    if (type === 'send') {
      setShowWidgetSend(true);
    } else {
      setShowWidgetEdit(true);
    }
  }
  
  console.log('Table рендерится с items:', items);
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
          {items?.length === 0 ? (
            <tr>
              <td colSpan={10} className="text-center p-8 text-gray-500">
                Нет обращений
              </td>
            </tr>
          ) : (
            items?.map((item) => (  
              <tr 
                key={item.id} 
                className="animate-table"
              >
                <td className="p-3 border-b border-[#D5BDAF]">{new Date(item.date).toLocaleString()}</td>              
                <td className="p-3 border-b border-[#D5BDAF] max-w-xs wrap-break-words">{item.fullName}</td>        
                <td className="p-3 border-b border-[#D5BDAF]">{item.enterprise}</td>          
                <td className="p-3 border-b border-[#D5BDAF] max-w-xs wrap-break-words">{item.phoneNumber}</td>    
                <td className="p-3 border-b border-[#D5BDAF]">{item.factoryNumbers}</td>     
                <td className="p-3 border-b border-[#D5BDAF] max-w-xs wrap-break-words">{item.typeDevices}</td>    
                <td className="p-3 border-b border-[#D5BDAF]">{item.email}</td>        
                <td className="p-3 border-b border-[#D5BDAF]">
                  <span className={
                    item.emotionalСolor === 'negative' ? 'text-[#1A1A1A] font-bold' :
                    item.emotionalСolor === 'positive' ? 'text-[#1A1A1A] opacity-60' :
                    'text-[#1A1A1A]'
                  }>
                    {item.emotionalСolor}
                  </span>
                </td>        
                <td className="p-3 border-b border-[#D5BDAF] max-w-md wrap-break-words">{item.essenceMatter}</td>  
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
            ))
          )}
       </tbody>
      </table>
    </div>
  );
}