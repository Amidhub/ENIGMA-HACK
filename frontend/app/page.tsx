'use client'
import Table from "@/components/Table";
import WidgetSendCell from "@/components/Widgets/WidgetSendCell";
import WidgetEditCell from "@/components/Widgets/WidgetEditCell";
import CellTableProps from "@/types/CellTableProps";
import { useEffect, useState } from "react";
import sendAnswer from "@/api/tickets/sendAnswer";
import WidgetCreateTicket from "@/components/Widgets/WidgetCreateTicket";
import WidgetExportFile from "@/components/Widgets/WidgetExportFile";

export default function Home() {
const defaultItems: CellTableProps[] = [
  {
    id: 1,
    date: '2024-02-20T10:30:00Z',
    fullName: 'Иванов Иван Иванович',
    enterprise: 'ООО "ТехноСервис"',
    phoneNumber: '+7 (999) 123-45-67',
    factoryNumbers: 'З-12345',
    typeDevices: 'Ноутбук Lenovo ThinkPad',
    email: 'user@mail.com',
    emotionalСolor: 'neutral',
    essenceMatter: 'Проблема с подключением к интернету'
  },
  {
    id: 2,
    date: '2024-02-21T14:15:00Z',
    fullName: 'Петров Петр Петрович',
    enterprise: 'ИП Петров',
    phoneNumber: '+7 (999) 234-56-78',
    factoryNumbers: 'З-12346',
    typeDevices: 'Смартфон Samsung Galaxy',
    email: 'client@ya.ru',
    emotionalСolor: 'negative',
    essenceMatter: 'Не могу отследить заказ'
  },
  {
    id: 3,
    date: '2024-02-22T09:45:00Z',
    fullName: 'Сидорова Анна Сергеевна',
    enterprise: 'АО "Системы Безопасности"',
    phoneNumber: '+7 (999) 345-67-89',
    factoryNumbers: 'З-12347',
    typeDevices: 'Планшет iPad',
    email: 'help@me.org',
    emotionalСolor: 'positive',
    essenceMatter: 'Проблема с доступом в личный кабинет'
  },
  {
    id: 4,
    date: '2024-02-23T16:20:00Z',
    fullName: 'Козлов Дмитрий Николаевич',
    enterprise: 'ООО "Финансовые Решения"',
    phoneNumber: '+7 (999) 456-78-90',
    factoryNumbers: 'З-12348',
    typeDevices: 'Ноутбук HP',
    email: 'support@test.io',
    emotionalСolor: 'neutral',
    essenceMatter: 'Ошибка при оплате'
  }
];
  const [items, setItems] = useState<CellTableProps[]>(defaultItems); //СДЕЛАТЬ ХУК useHome или назвать как нибудь

  useEffect(() => {
    const saved = localStorage.getItem('items');
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setItems(JSON.parse(saved));
    }
  }, []);


  const [showWidgetEdit, setShowWidgetEdit] = useState<boolean>(false);
  const [showWidgetSend, setShowWidgetSend] = useState<boolean>(false);
  const [showWidgetCreate, setShowWidgetCreate] = useState<boolean>(false);
  const [showWidgetExport, setShowWidgetExport] = useState<boolean>(false);

  const [currentCell, setCurrentCell] = useState<CellTableProps>(items[0]);

  useEffect(() => { 
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);// localStorage для тестов

  const handleSaveEditedAnswer = (id: number, editedAnswer: string) => {
    setItems(prev => prev.map(item => item.id === id ? {...item, llmAnswer: editedAnswer} : item));
    alert('Ответ успешно изменен') //ПОМЕНЯТЬ НА КАСТОМНЫЕ УВЕДОМЛЕНИЯ
    setShowWidgetEdit(false)
  }

  
  const handleSendAnswer = async () => {
    try {
      const data = await sendAnswer(currentCell);
      if (!data.success) {
        
      }

      setShowWidgetSend(false);
    } catch (error) {
      console.error(error); 
    }
    
  }

  const createTicket = (item: CellTableProps) => {
    try {
     setItems(prev => {
        const nextId = prev.length > 0 ? prev[prev.length - 1]!.id + 1 : 1;
        return [...prev, { ...item, id: nextId }];
      })
      localStorage.setItem('items', JSON.stringify(items));
      setShowWidgetCreate(false)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex justify-center pt-20 h-screen p-4 animate-home">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-end gap-5">
          <button 
            className="border-2 rounded-2xl p-2 pr-3 pl-3 bg-[#77BFA3] cursor-pointer hover:bg-[#98C9A3] transition-all duration-300" 
            type="button"
            onClick={() => setShowWidgetCreate(true)}
          > Создать запись
          </button>
          <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-[opacity,visibility] duration-300 ease-in-out ${showWidgetExport ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setShowWidgetExport(false)}>
            <div className="bg-[#EDEEC9] border border-[#BFD8BD] rounded-2xl shadow-xl min-w-75 max-w-125 w-[90%] max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <WidgetExportFile 
                key={currentCell.id} 
                items={items}
                OnClick={() => setShowWidgetExport(false)}
              />
            </div>
          </div>
            <button 
              className="animate-button border-2 rounded-full p-5 w-10 h-10 flex justify-center items-center border-[#77BFA3] text-green-500 cursor-pointer hover:bg-[#98C9A3] transition-colors duration-300 ease-in-out" 
              onClick={() => setShowWidgetExport(true)}
            >
              ⤓ 
          </button>
        </div>
         <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-[opacity,visibility] duration-300 ease-in-out ${showWidgetCreate ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setShowWidgetCreate(false)}>
          <div className="bg-[#EDEEC9] border border-[#BFD8BD] rounded-2xl shadow-xl min-w-75 max-w-125 w-[90%] max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <WidgetCreateTicket 
              key={currentCell.id} 
              OnClick={createTicket}
            />
          </div>
        </div>
        <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-[opacity,visibility] duration-300 ease-in-out ${showWidgetEdit ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setShowWidgetEdit(false)}>
          <div className="bg-[#EDEEC9] border border-[#BFD8BD] rounded-2xl shadow-xl min-w-75 max-w-125 w-[90%] max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <WidgetEditCell 
              key={currentCell.id} 
              item={currentCell} 
              OnClick={handleSaveEditedAnswer}
            />
          </div>
        </div>
        <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-[opacity,visibility] duration-300 ease-in-out ${showWidgetSend ? 'opacity-100 visible' : 'opacity-0 invisible'}` } onClick={() => setShowWidgetSend(false)}>
          <div className="bg-[#EDEEC9] border border-[#BFD8BD] rounded-2xl shadow-xl min-w-75 max-w-125 w-[90%] max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <WidgetSendCell 
              key={currentCell.id} 
              item={currentCell} 
              OnClick={handleSendAnswer}
            />
          </div>
        </div>
        <Table items={items} setShowWidgetEdit={setShowWidgetEdit} setShowWidgetSend={setShowWidgetSend} setCurrentCell={setCurrentCell}/>
      </div>
    </div>
  );
}
