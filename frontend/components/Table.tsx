import CellTableProps from "@/types/CellTableProps";
import TableProps from "@/types/TableProps";

export default function Table({ items, setShowWidgetEdit, setCurrentCell }: TableProps) {
  const handleCurrentCell = (item: CellTableProps) => {
    setCurrentCell(item)
    setShowWidgetEdit(true)
  }

  return (
    <div className="rounded-xl overflow-hidden border border-[#BFD8BD] shadow-sm">
      <table className="w-full border-collapse">
        <thead className="bg-[#77BFA3] text-white uppercase text-sm">
          <tr>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Вопрос</th>
            <th className="p-3 text-left">Ответ</th>
            <th className="p-3 text-left">Действие</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr 
              key={item.id} 
              className={index % 2 === 0 ? 'bg-[#EDEEC9]' : 'bg-white'}
            >
              <td className="p-3 border-b border-[#BFD8BD]">{item.email}</td>
              <td className="p-3 border-b border-[#BFD8BD] max-w-xs wrap-break-words">{item.question}</td>
              <td className="p-3 border-b border-[#BFD8BD] max-w-md wrap-break-words">{item.llmAnswer}</td>
              <td className="p-3 border-b border-[#BFD8BD]">
                <div className="flex gap-2">
                  <button className="bg-[#77BFA3] text-white px-3 py-1 rounded-md hover:bg-[#98C9A3]">
                    ✓
                  </button>
                  <button className="bg-[#BFD8BD] text-gray-700 px-3 py-1 rounded-md hover:bg-[#DDE7C7]" onClick={() => handleCurrentCell(item)}>
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
