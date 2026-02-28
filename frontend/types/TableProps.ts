import PageProps from "./PageProps";
export default interface TableProps {
  currentPage: PageProps;
  setShowWidgetEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setShowWidgetSend: React.Dispatch<React.SetStateAction<boolean>>;
  sortPageDate(sortType: string): void;
  sortPageEmotial(sortType: string): void;
}
