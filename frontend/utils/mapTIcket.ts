import CellTableProps from "@/types/CellTableProps";
import TicketResponse from "@/types/ResponseTicketProps";

const mapTickets = (apiTickets: TicketResponse[]): CellTableProps[] => {
  return apiTickets.map(ticket => ({
    id: ticket.id,
    date: ticket.created_at,
    fullName: ticket.full_name || '',
    enterprise: ticket.company_object || '',
    phoneNumber: ticket.phone || '',
    factoryNumbers: ticket.serial_numbers || '',
    typeDevices: ticket.device_type || '',
    email: ticket.email,
    emotionalСolor: mapSentiment(ticket.sentiment),
    essenceMatter: ticket.original_text,
    llmAnswer: ticket.generated_response || '',
  }));
};

const mapSentiment = (sentiment: string | null): 'positive' | 'negative' | 'neutral' => {
  switch (sentiment) {
    case 'POSITIVE': return 'positive';
    case 'NEGATIVE': return 'negative';
    default: return 'neutral';
  }
};

export default mapTickets;