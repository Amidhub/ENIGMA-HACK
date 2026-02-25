import CellTableProps from "./CellTableProps";

export default interface WidgetCellCreateProps {
  OnClick(item: CellTableProps): void;
}