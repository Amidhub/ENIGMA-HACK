import { useTicketStore } from "@/store/useTicketStore";
import { useEffect, useState } from "react";

const InputFind = () => {
  const {
    tickets,
    backupTickets,
    setTickets,
  } = useTicketStore();

  const [filterEmail, setFilterEmail] = useState<string>('');

  const filterTickets = () => {
    if (filterEmail.trim() === '') {
      setTickets(backupTickets);
    } else {
      const filtered = backupTickets.filter(ticket => 
        ticket.email.toLowerCase().startsWith(filterEmail.toLowerCase())
      );
      setTickets(filtered);
    }
  };

  useEffect(() => {
    filterTickets();
  }, [filterEmail]);

  const resetFilter = () => {
    setFilterEmail('');
    setTickets(backupTickets);
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <label htmlFor="input-find">🔍</label>
      <input 
        type="text" 
        id="input-find" 
        value={filterEmail}
        onChange={(e) => setFilterEmail(e.target.value)}
        placeholder="Введите email"
        className="border-2 border-[#D5BDAF] bg-white rounded-2xl p-2 w-2xl focus:outline-none focus:border-[#1A1A1A] focus:ring-2 focus:ring-[#D5BDAF]/20 transition-all duration-300" 
      />
      {filterEmail && (
        <button 
          onClick={resetFilter}
          className="px-3 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default InputFind;