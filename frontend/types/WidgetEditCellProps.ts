import CellTableProps from "./CellTableProps";

export default interface WidgetEditCellProps {
  item: CellTableProps | null;
  onSave(itemId: number, editedAnswer: string): void;
}