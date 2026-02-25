export default interface CellTableProps {
  id?: number;
  date: string;
  fullName: string;
  enterprise: string;
  phoneNumber: string;
  factoryNumbers: string;
  typeDevices: string;
  email: string;
  emotionalСolor: 'positive' | 'negative' | 'neutral';
  essenceMatter: string;
}
