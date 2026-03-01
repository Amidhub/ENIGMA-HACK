'use client'

import checkStatus from "@/api/tickets/checkStatus";
import updateStatus from "@/api/tickets/updateStatus";
import { useTicketStore } from "@/store/useTicketStore";
import CellTableProps from "@/types/CellTableProps";
import TableProps from "@/types/TableProps";
import { useState } from "react";

export default function Table({setShowWidgetEdit, setShowWidgetSend, currentPage, sortPageDate, sortPageEmotial} : TableProps) {
  const { setCurrentTicket } = useTicketStore();  
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [sortEmotionalСolor, setSortEmotionalСolor] = useState<'neutral' | 'positive' | 'negative'>('neutral')

  const handleCurrentCellEdit = (item: CellTableProps, type: 'send' | 'edit') => {
    setCurrentTicket(item);
    if (type === 'send') {
      setShowWidgetSend(true);
    } else {
      setShowWidgetEdit(true);
    }
  }
  const handleSortDate = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    sortPageDate(sortDirection)
  }

  const handleSortEmotional = () => {
    const nextValue = sortEmotionalСolor === 'positive' 
    ? 'neutral'  
    : sortEmotionalСolor === 'neutral' 
      ? 'negative' 
      : 'positive';
  
    setSortEmotionalСolor(nextValue);
    sortPageEmotial(nextValue)
  }
  const getEmotionalIcon = () => {
    if (sortEmotionalСolor === 'positive') return '↑';
    if (sortEmotionalСolor === 'neutral') return '−';
    return '↓';
  };

  const handleSendClick = async (item: CellTableProps) => {
  handleCurrentCellEdit(item, 'send');
  
  const status = await checkStatus(item);
  if (status?.status !== 'in_progress') {
    const updateResult = await updateStatus(item);
    if (updateResult?.status) {
      console.log('Status updated');
    }
  }
};

  return (
    <div className="rounded-xl overflow-hidden border border-[#D5BDAF] shadow-sm pointer-events-auto">
      <table className="w-full border-collapse">
        <thead className="bg-[#D5BDAF] text-white uppercase text-sm">
          <tr>
            <th className="p-3 text-left">
              <div className="flex items-center gap-2">
                Дата
                <button className="cursor-pointer hover:bg-[#F5EBE0] p-1 rounded transition-colors" onClick={handleSortDate}>
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </button>
              </div>
            </th>      
            <th className="p-3 text-left">ФИО</th>
            <th className="p-3 text-left">Организация</th>
            <th className="p-3 text-left">Телефон</th>
            <th className="p-3 text-left">Заводской №</th>
            <th className="p-3 text-left">Тип устройства</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">
              <div className="flex items-center gap-2">
                Эмоция
                <button className="cursor-pointer hover:bg-[#F5EBE0] p-1 rounded transition-colors" onClick={handleSortEmotional}>
                  {getEmotionalIcon()}
                </button>
              </div>
            </th>
            <th className="p-3 text-left">Суть вопроса</th>
            <th className="p-3 text-left">Ответ нейросети</th>
            <th className="p-3 text-left">Действие</th>
          </tr>
        </thead>
        <tbody>
          {currentPage?.tickets?.length === 0 ? (
            <tr>
              <td colSpan={11} className="p-8 text-center">
                <div className="flex flex-col items-center justify-center gap-3">
                  <span className="text-6xl">📭</span>
                  <p className="text-xl text-[#646360] font-medium">Нет обращений</p>
                  <p className="text-sm text-[#646360]/70">Пока нет ни одной заявки</p>
                </div>
              </td>
            </tr>
          ) : (
            currentPage?.tickets.map((item) => (
              <tr key={item.id} className='animate-table hover:bg-[#F5EBE0]/50 transition-colors'>
                <td className="p-3 border-b border-[#D5BDAF]">{new Date(item.date).toLocaleString()}</td>              
                <td className="p-3 border-b border-[#D5BDAF] max-w-xs wrap-break-words">{item.fullName}</td>        
                <td className="p-3 border-b border-[#D5BDAF]">{item.enterprise}</td>          
                <td className="p-3 border-b border-[#D5BDAF] max-w-xs wrap-break-words">{item.phoneNumber}</td>    
                <td className="p-3 border-b border-[#D5BDAF]">{item.factoryNumbers}</td>     
                <td className="p-3 border-b border-[#D5BDAF] max-w-xs wrap-break-words">{item.typeDevices}</td>    
                <td className="p-3 border-b border-[#D5BDAF]">{item.email}</td>        
                <td className="p-3 border-b border-[#D5BDAF]">
                  <span className={
                    item.emotionalСolor === 'positive' ? 'text-green-600' :
                    item.emotionalСolor === 'negative' ? 'text-red-600' :
                    'text-[#646360]' 
                  }> {item.emotionalСolor}
                  </span>
                </td>        
                <td className="p-3 border-b border-[#D5BDAF] max-w-md wrap-break-words whitespace-normal w-1/5">{item.essenceMatter}</td>
                <td className="p-3 border-b border-[#D5BDAF] max-w-md wrap-break-words w-1/5">{item.llmAnswer}</td>  
                <td className="p-3 border-b border-[#D5BDAF]">                                
                  <div className="flex gap-2">
                    <button 
                      className="bg-[#D5BDAF] text-white px-3 py-1 rounded-md cursor-pointer hover:bg-[#EDEDE9] hover:text-[#1A1A1A] transition-colors" 
                      onClick={() => handleSendClick(item)} 
                    >
                      ✓
                    </button>
                    <button 
                      className="bg-[#EDEDE9] text-[#1A1A1A] px-3 py-1 rounded-md cursor-pointer hover:bg-[#D5BDAF] hover:text-[#EDEDE9] transition-colors" 
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