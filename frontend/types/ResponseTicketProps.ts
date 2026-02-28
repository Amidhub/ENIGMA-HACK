export default interface TicketResponse {
  id: number;
  received_date: string;  
  status: 'NEW' | 'IN_PROGRESS' | 'ANSWERED' | 'NEEDS_REVIEW';
  
  full_name: string | null;
  email: string;
  phone: string | null;
  company_object: string | null;
  
  device_type: string | null;
  serial_numbers: string | null;
  
  original_text: string;
  issue_summary: string | null;
  category: string | null;
  
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | null;
  confidence: number | null;
  
  generated_response: string | null;
  final_response: string | null;
  answered_at: string | null;  
  
  created_at: string;  
  updated_at: string;  
}