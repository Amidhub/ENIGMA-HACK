'use client'

import { useNotification } from "@/hooks/useNotification";
import Notiflication from "./Notiflication";

const GlobalNotiflication = () => {
  const {
    notifications,
    removeNotification
  } = useNotification();
  
  return (
    <div className="fixed top-18 right-4 z-50 w-80 space-y-2 pointer-events-auto">      
    {notifications.map(notif => (
      <div key={notif.notificationId} className={`notification-item ${notif.type}-chat`}>
        <Notiflication
          type={notif.type} 
          message={notif.message} 
          onClose={() => removeNotification(notif.notificationId)} 
          notificationId={notif.notificationId} 
        />
      </div>
      ))}
    </div>
  );
};

export default GlobalNotiflication;