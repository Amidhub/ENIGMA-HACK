import CellTableProps from "@/types/CellTableProps";
import TicketResponse from "@/types/ResponseTicketProps";

const mapToApiTicket = (cellTicket: CellTableProps): TicketResponse => {
  return {
    id: cellTicket.id || 0,
    received_date: cellTicket.date,
    full_name: cellTicket.fullName || null,
    email: cellTicket.email,
    phone: cellTicket.phoneNumber || null,
    company_object: cellTicket.enterprise || null,
    device_type: cellTicket.typeDevices || null,
    serial_numbers: cellTicket.factoryNumbers || null,
    original_text: cellTicket.essenceMatter,
    issue_summary: null, // если нет в CellTableProps
    category: 'other', // значение по умолчанию
    sentiment: cellTicket.emotionalСolor,
    confidence: 0.5, // значение по умолчанию
    generated_response: cellTicket.llmAnswer || null,
    final_response: null,
    answered_at: null,
    status: 'new', // значение по умолчанию
    created_at: cellTicket.date,
    updated_at: new Date().toISOString()
  };
};


export default mapToApiTicket;