import CellTableProps from "./CellTableProps";

export default interface TableProps {
  items: CellTableProps[];
  setShowWidgetEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setShowWidgetSend: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentCell: React.Dispatch<React.SetStateAction<CellTableProps>> ;
}
