import CellTableProps from "@/types/CellTableProps";
import TicketResponse from "@/types/ResponseTicketProps";

const mapToApiTicket = (cellTicket: CellTableProps): Partial<TicketResponse> => {
  return {
    email: cellTicket.email,
    original_text: cellTicket.essenceMatter,
    full_name: cellTicket.fullName,
    phone: cellTicket.phoneNumber || null,
    company_object: cellTicket.enterprise || null,
    device_type: cellTicket.typeDevices || null,
    serial_numbers: cellTicket.factoryNumbers || null,
    sentiment: cellTicket.emotionalСolor || null,
    generated_response: cellTicket.llmAnswer || null,
  };
};

export default mapToApiTicket;