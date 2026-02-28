import { useTicketStore } from "@/store/useTicketStore";
import { useEffect, useState } from "react";
import PageProps from "@/types/PageProps";

const usePages = () => {
  const { tickets, fetchTickets } = useTicketStore(); 
  const [pages, setPages] = useState<PageProps[]>([]);
  const [countPages, setCountPages] = useState<number>(1);
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState<PageProps>(pages[0]);
  
  useEffect(() => {
    fetchTickets(); 
    
    const interval = setInterval(() => {
      fetchTickets();
    }, 20000); 
    
    return () => clearInterval(interval); 
  }, [fetchTickets]);

  useEffect(() => {
    const totalPages = Math.ceil(tickets.length / itemsPerPage);
    const newPages = [];
    
    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      const startIndex = (pageNum - 1) * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, tickets.length);
      const pageTickets = tickets.slice(startIndex, endIndex);
      
      newPages.push({
        page: pageNum,
        tickets: pageTickets,
        startIndex: startIndex + 1,
        endIndex: endIndex
      });
    }
    
    setPages(newPages);
    setCountPages(totalPages);
    
    if (currentPage) {
      const updatedPage = newPages.find(p => p.page === currentPage.page);
      if (updatedPage) {
        setCurrentPage(updatedPage);
      } else if (newPages.length > 0) {
        setCurrentPage(newPages[0]); 
      }
    } else if (newPages.length > 0) {
      setCurrentPage(newPages[0]);
    }
  }, [tickets]);

  const goNextPage = () => {
    if (currentPage?.page === countPages) return;
    const nextPage = pages.find(p => p.page === currentPage!.page + 1);
    if (nextPage) setCurrentPage(nextPage);
  }

  const goPrevPage = () => {
    if (currentPage?.page === 1) return;
    const prevPage = pages.find(p => p.page === currentPage!.page - 1);
    if (prevPage) setCurrentPage(prevPage);
  }

  const goPagePressPage = (numberPage: number) => {
    setCurrentPage(pages[numberPage - 1])
  }

  const sortPageDate = (sortType: 'asc' | 'desc') => {
    currentPage.tickets.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      
      return sortType === 'asc' ? dateA - dateB : dateB - dateA;
    });
  };

  const sortPageEmotial = (sortType: 'positive' | 'neutral' | 'negative') => {
    const emotionalOrder = {
      positive: 1,
      neutral: 2, 
      negative: 3
    };

    currentPage.tickets.sort((a, b) => {
      if (sortType === 'positive') {
        return emotionalOrder[a.emotionalСolor] - emotionalOrder[b.emotionalСolor];
      }
      else if (sortType === 'negative') {
        return emotionalOrder[b.emotionalСolor] - emotionalOrder[a.emotionalСolor];
      } else {
        if (a.emotionalСolor === 'neutral') return -1;
        if (b.emotionalСolor === 'neutral') return 1;
        return 0;
      }
    });

  };

  return {
    countPages, 
    currentPage,
    pages,
    itemsPerPage,
    setCurrentPage,
    goNextPage,
    goPrevPage,
    goPagePressPage,
    sortPageDate,
    sortPageEmotial,
  }
}

export default usePages;