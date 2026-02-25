import WidgetExportFileProps from '@/types/WidgetExportFileProps';
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const WidgetExportFile = ({items, OnClick}: WidgetExportFileProps) => {
  const [radioVariant, setRadioVariant] = useState<'csv' | 'xlsx'>('xlsx');

  const exportToFile  = (type: 'csv' | 'xlsx') => {
    const headers = [
      'Дата',
      'ФИО', 
      'Организация',
      'Телефон',  
      'Заводской номер',
      'Тип устройства',
      'Email',
      'Эмоциональный окрас',
      'Суть вопроса'
    ];

    const rows = items.map(item => [
      new Date(item.date).toLocaleString('ru-RU'),       
      item.fullName,
      item.enterprise,
      item.phoneNumber,
      item.factoryNumbers,
      item.typeDevices,
      item.email,
      item.emotionalСolor === 'positive' ? 'Позитивный' :
      item.emotionalСolor === 'negative' ? 'Негативный' : 'Нейтральный',
      item.essenceMatter 
    ]);

    if (type === 'xlsx') {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
      
      const colWidths = [
        { wch: 20 }, 
        { wch: 25 }, 
        { wch: 30 },
        { wch: 15 },
        { wch: 20 },
        { wch: 20 },
        { wch: 25 },
        { wch: 15 }, 
        { wch: 50 }, 
      ];
      ws['!cols'] = colWidths;
      
      XLSX.utils.book_append_sheet(wb, ws, 'Обращения');
      XLSX.writeFile(wb, `tickets_${new Date().toISOString().slice(0,10)}.xlsx`);
    } else {
      const csvRows = rows.map(row => [
        row[0], 
        row[1], 
        row[2], 
        row[3],
        row[4], 
        row[5], 
        row[6], 
        row[7], 
        `"${row[8].replace(/"/g, '""')}"` 
      ]);

      const csv = [
        headers.join(';'),
        ...csvRows.map(row => row.join(';'))
      ].join('\n');

      const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });    
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `tickets_${new Date().toISOString().slice(0,10)}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const handleExportFile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    exportToFile(radioVariant);
    OnClick();
  }

  return (
    <form className="flex flex-col p-10 gap-10" onSubmit={handleExportFile}>
      <div className="flex">
        <div className="flex justify-center gap-1 w-full">
          <input
            type="radio"
            className="appearance-none w-4.5 h-4.5 border-2 border-[#98C9A3] rounded-full bg-[#DDE7C7] cursor-pointer transition duration-200 checked:shadow-[inset_0_0_0_3px_#BFD8BD] checked:border-[#77BFA3] checked:bg-[#77BFA3]"
            id="input-radio-csv"
            value="csv"  
            checked={radioVariant === 'csv'}
            onChange={() => setRadioVariant('csv')}
          /> 
          <label htmlFor="input-radio-csv" className='-mt-0.5'>CSV</label>
        </div>
        <div className="flex justify-center gap-1 w-full">
          <input
            type="radio"
            id="input-radio-xlsx"
            className="appearance-none w-4.5 h-4.5 border-2 border-[#98C9A3] rounded-full bg-[#DDE7C7] cursor-pointer transition duration-200 checked:shadow-[inset_0_0_0_3px_#BFD8BD] checked:border-[#77BFA3] checked:bg-[#77BFA3]"
            value="xlsx"   
            checked={radioVariant === 'xlsx'}
            onChange={() => setRadioVariant('xlsx')}
          /> 
          <label htmlFor="input-radio-xlsx" className='-mt-0.5'>XLSX</label>
        </div>
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


export default WidgetExportFile;