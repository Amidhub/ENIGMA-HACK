'use client'

import NotificationContext from "@/context/NotificationContext";
import NotificationProps from "@/types/NotificationProps";
import { useState, type ReactNode } from "react";

export const NotificationProvider = ({children}: {children: ReactNode}) => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const addNotification = (type: NotificationProps['type'], message: string) => {
    const notificationId = Date.now();

    setNotifications(prev => [...prev, {notificationId, type, message}]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.notificationId !== notificationId));
    }, 3000);
  }

  const removeNotification = (notificationId: number) => {    
    setNotifications(prev => prev.filter(n => n.notificationId !== notificationId));
  }

  return ( 
    <NotificationContext.Provider value={{notifications, addNotification, removeNotification}}>
      {children}
    </NotificationContext.Provider>
  );
}