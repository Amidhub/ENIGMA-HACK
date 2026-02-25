'use client'

import Table from "@/components/Table";
import WidgetSendCell from "@/components/Widgets/WidgetSendCell";
import WidgetEditCell from "@/components/Widgets/WidgetEditCell";
import CellTableProps from "@/types/CellTableProps";
import { useState } from "react";
import sendAnswer from "@/api/tickets/sendAnswer";

export default function Home() {
  const [data, setData] = useState([
    {
      id: 1,
      email: 'user@mail.com',
      question: 'Не грузится сайт',
      llmAnswer: 'Проверьте подключение к интернету. Если не помогает — очистите кэш браузера или попробуйте другой браузер.'
    },
    {
      id: 2,
      email: 'client@ya.ru',
      question: 'Где мой заказ?',
      llmAnswer: 'Ваш заказ №12345 находится в доставке. Ожидаемая дата — 25 февраля.'
    },
    {
      id: 3,
      email: 'help@me.org',
      question: 'Не могу сбросить пароль',
      llmAnswer: 'Перейдите по ссылке «Забыли пароль» на странице входа. Письмо со ссылкой придёт в течение 5 минут.'
    },
    {
      id: 4,
      email: 'support@test.io',
      question: 'Ошибка при оплате',
      llmAnswer: 'Попробуйте другой способ оплаты или обратитесь в банк. Код ошибки: 403.'
    },
  ])
  const [showWidgetEdit, setShowWidgetEdit] = useState<boolean>(false);
  const [showWidgetSend, setShowWidgetSend] = useState<boolean>(false);

  const [currentCell, setCurrentCell] = useState<CellTableProps>(data[0]);
  
  const handleSaveEditedAnswer = (id: number, editedAnswer: string) => {
    setData(prev => prev.map(item => item.id === id ? {...item, llmAnswer: editedAnswer} : item));
    alert('Ответ успешно имзенен') //ПОМЕНЯТЬ НА КАСТОМНЫЕ УВЕДОМЛЕНИЯ
    setShowWidgetEdit(false)
  }

  const handleSendAnswer = async () => {
    try {
      const data = await sendAnswer(currentCell);
      if (!data.success) {
        
      }

      setShowWidgetSend(false);
    } catch (error) {
      
    }
    
  }

  return (
    <div className="flex justify-center pt-20 h-screen p-4 animate-home">
      <div className="w-full">
        <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-[opacity,visibility] duration-300 ease-in-out ${showWidgetEdit ? 'opacity-100 visible' : 'opacity-0 invisible'}` } onClick={() => setShowWidgetEdit(false)}>
          <div className="bg-[#EDEEC9] border border-[#BFD8BD] rounded-2xl shadow-xl min-w-75 max-w-125 w-[90%] max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <WidgetEditCell key={currentCell.id} item={currentCell} OnClick={handleSaveEditedAnswer}/>
          </div>
        </div>
        <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-[opacity,visibility] duration-300 ease-in-out ${showWidgetSend ? 'opacity-100 visible' : 'opacity-0 invisible'}` } onClick={() => setShowWidgetSend(false)}>
          <div className="bg-[#EDEEC9] border border-[#BFD8BD] rounded-2xl shadow-xl min-w-75 max-w-125 w-[90%] max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <WidgetSendCell key={currentCell.id} item={currentCell} OnClick={handleSendAnswer}/>
          </div>
        </div>
        <Table items={data} setShowWidgetEdit={setShowWidgetEdit} setShowWidgetSend={setShowWidgetSend} setCurrentCell={setCurrentCell}/>
      </div>
    </div>
  );
}
