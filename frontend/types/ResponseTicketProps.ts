export default interface TicketResponse {
  id: number;
  full_name: string;
  created_at: string;
  company_object: string | null;
  phone: string | null;
  serial_numbers: string | null;
  device_type: string | null;
  email: string;
  sentiment: string | null;  
  original_text: string;
  generated_response: string | null;
}