import CellTableProps from "./CellTableProps";

export default interface WidgetExportFileProps {
  items: CellTableProps[];
  OnClick(): void;
}