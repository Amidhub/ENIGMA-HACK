import CellTableProps from "./CellTableProps";

export default interface WidgetCellProps {
  item: CellTableProps;
  OnClick?(itemId: number, editedAnswer: string): void;
}