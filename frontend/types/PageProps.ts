import CellTableProps from "./CellTableProps";

export default interface PageProps {
  page: number,
  tickets: CellTableProps[],
  startIndex: number,
  endIndex: number
}