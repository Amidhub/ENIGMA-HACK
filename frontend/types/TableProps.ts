import CellTableProps from "./CellTableProps";

export default interface TableProps {
  items: CellTableProps[];
  setItems?: React.Dispatch<React.SetStateAction<CellTableProps[]>>;
  setShowWidgetEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentCell: React.Dispatch<React.SetStateAction<CellTableProps | null>> ;
}
