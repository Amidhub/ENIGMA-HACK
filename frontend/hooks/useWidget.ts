import { useState } from "react";

const useWidget = () => {
  const [showWidgetEdit, setShowWidgetEdit] = useState<boolean>(false);
  const [showWidgetSend, setShowWidgetSend] = useState<boolean>(false);
  const [showWidgetCreate, setShowWidgetCreate] = useState<boolean>(false);
  const [showWidgetExport, setShowWidgetExport] = useState<boolean>(false);

  return {
    showWidgetEdit,
    showWidgetSend,
    showWidgetCreate,
    showWidgetExport,
    setShowWidgetEdit,
    setShowWidgetCreate,
    setShowWidgetExport,
    setShowWidgetSend
  }
}

export default useWidget;