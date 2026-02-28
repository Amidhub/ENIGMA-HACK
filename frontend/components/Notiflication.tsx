'use client'

import NotificationProps from "@/types/NotificationProps";

const Notification = ({ type, message, onClose }: NotificationProps) => {
  const styles = {
    error: 'border-[#D5BDAF] bg-[#F5EBE0] text-[#1A1A1A]',
    success: 'border-[#D5BDAF] bg-[#F5EBE0] text-[#1A1A1A]',
    info: 'border-[#D6CCC2] bg-[#EDEDE9] text-[#1A1A1A]',
    warning: 'border-[#D5BDAF] bg-[#F5EBE0] text-[#1A1A1A]'
  };

  const typeLabels = {
    error: 'Ошибка',
    success: 'Успех',
    info: 'Информация',
    warning: 'Предупреждение'
  };

  return (
    <div className={`rounded-lg shadow-lg overflow-hidden mb-3 animate-slideIn ${styles[type]} animate-notification`}>
      <div className="flex items-center p-4">
        <span className="text-xl mr-3">{typeLabels[type]}</span>
        <div className="flex-1">
          <p className="text-sm opacity-90">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="ml-4 w-6 h-6 flex items-center cursor-pointer justify-center rounded-full hover:bg-[#D5BDAF]/20 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Notification;