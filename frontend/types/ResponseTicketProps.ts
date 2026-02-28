export default interface TicketResponse {
  // Системные поля
  id: number;
  received_date: string;  // datetime в ISO формате
  status: 'NEW' | 'IN_PROGRESS' | 'ANSWERED' | 'NEEDS_REVIEW';
  
  // Данные отправителя
  full_name: string | null;
  email: string;
  phone: string | null;
  company_object: string | null;
  
  // Данные о приборах
  device_type: string | null;
  serial_numbers: string | null;
  
  // Содержание обращения
  original_text: string;
  issue_summary: string | null;
  category: string | null;
  
  // Результаты AI-анализа
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | null;
  confidence: number | null;
  
  // Ответы
  generated_response: string | null;
  final_response: string | null;
  answered_at: string | null;  // datetime в ISO формате
  
  // Технические поля
  created_at: string;  // datetime в ISO формате
  updated_at: string;  // datetime в ISO формате
}