import CellTableProps from "./CellTableProps";

export default interface WidgetCellProps {
  item: CellTableProps;
  OnClick?(ticket: CellTableProps): void;
}