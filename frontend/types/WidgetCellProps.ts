import CellTableProps from "./CellTableProps";

export default interface WidgetCellProps {
  item: CellTableProps;
  OnClick?(itemId: number, editedItem: Partial<CellTableProps>): void;
}