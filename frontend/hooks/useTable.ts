import sendAnswer from "@/api/tickets/sendAnswer";
import CellTableProps from "@/types/CellTableProps";
import { useEffect, useState } from "react";

const useTable = () => {
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
    const [items, setItems] = useState<CellTableProps[]>(defaultItems);
    const [currentCell, setCurrentCell] = useState<CellTableProps>(items[0]);
  
   useEffect(() => { 
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const handleSaveEditedAnswer = (id: number, editedAnswer: string, handleFunction: () => void) => {
    setItems(prev => prev.map(item => item.id === id ? {...item, llmAnswer: editedAnswer} : item));
    alert('Ответ успешно изменен')
    handleFunction()
  }

  const handleSendAnswer = async (handleFunction: () => void) => {
    try {
      const data = await sendAnswer(currentCell);
      if (!data.success) {
        // обработка ошибки
      }
      handleFunction();
    } catch (error) {
      console.error(error); 
    }
  }

  const createTicket = (item: CellTableProps, handleFunction: () => void ) => {
    try {
      
     setItems(prev => {
      console.log('Текущие items:', prev);
        const nextId = prev.length > 0 ? prev[prev.length - 1]!.id + 1 : 1;
        const newItems = [...prev, { ...item, id: nextId }];
              console.log('Новые items:', newItems); 
        localStorage.setItem('items', JSON.stringify(newItems)); 
        
        return newItems;
      });
      handleFunction()
    } catch (error) {
      console.error(error);
    }
  }

  return {
    items,
    currentCell,
    setCurrentCell,
    setItems,
    createTicket,
    handleSaveEditedAnswer,
    handleSendAnswer,
  }
}

export default useTable;