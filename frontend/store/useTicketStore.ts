import getTickets from "@/api/tickets/getTickets";
import CellTableProps from "@/types/CellTableProps";
import TicketResponse from "@/types/ResponseTicketProps";
import mapTickets from "@/utils/mapTIcket";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TicketStore {
  tickets: CellTableProps[];
  backupTickets: CellTableProps[];
  currentTicket: CellTableProps | null;
  isLoading: boolean;
  error: string | null;

  setTickets: (ticket: CellTableProps[]) => void;
  setCurrentTicket: (ticket: CellTableProps | null) => void;
  addTicket: (ticket: CellTableProps) => void;
  updateTicket: (id: number, data: Partial<CellTableProps>) => void;
  fetchTickets: () => Promise<void>;
  startAutoRefresh: () => void; 
  stopAutoRefresh: () => void;  
}

export const useTicketStore = create<TicketStore>()(
  persist(
    (set, get) => {
      let intervalId: NodeJS.Timeout | null = null;

      return {
        tickets: [],
        backupTickets: [],
        currentTicket: null,
        isLoading: false,
        error: null,

        setTickets: (tickets) => set({ tickets }),
        setCurrentTicket: (currentTicket) => set({ currentTicket }),
        
        addTicket: (ticket) => set((state) => ({ 
          tickets: [...state.tickets, ticket] 
        })),
        
        updateTicket: (id, data) => set((state) => ({
          tickets: state.tickets.map(ticket => 
            ticket.id === id ? { ...ticket, ...data } : ticket
          ) 
        })),

        fetchTickets: async () => {
          set({ isLoading: true, error: null });
          try {
            const data: TicketResponse[] = await getTickets();
            console.log(data)
            const mappedData: CellTableProps[] = mapTickets(data);
            console.log(mappedData)

            set({ 
              tickets: mappedData, 
              backupTickets: mappedData,
              isLoading: false 
            });
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Ошибка загрузки', 
              isLoading: false 
            });
          }
        },

        startAutoRefresh: () => {
          if (intervalId) clearInterval(intervalId);
          get().fetchTickets();
          
          intervalId = setInterval(() => {
            get().fetchTickets();
          }, 20000);
        },

        stopAutoRefresh: () => {
          if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
          }
        },
      };
    },
    {
      name: 'tickets-storage',
    }
  ),
);