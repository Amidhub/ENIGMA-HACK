import CellTableProps from "@/types/CellTableProps";
import { create } from "zustand";
import { persist } from "zustand/middleware";
interface TicketStore {
  tickets: CellTableProps[];
  currentTicket: CellTableProps | null;

  setTickets: (ticket: CellTableProps[]) => void;
  setCurrentTicket: (ticket: CellTableProps | null) => void;
  addTicket: (ticket: CellTableProps) => void;
  updateTicket: (id: number, data: Partial<CellTableProps>) => void;
}

export const useTicketStore = create<TicketStore>()(
  persist((set) => ({
    tickets: [],
    currentTicket: null,

    setTickets: (tickets) => set({tickets}),
    setCurrentTicket: (currentTicket) => set({ currentTicket }),
    addTicket: (ticket) => set((state) => ({ 
      tickets: [...state.tickets, ticket] 
    })),
    updateTicket: (id, data) => set((state) => ({
      tickets: state.tickets.map(ticket => ticket.id === id ? {...ticket, ...data} : ticket) 
    })),
  }),
  {name: 'tickets-storage'}
  ),
);