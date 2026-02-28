import { useTicketStore } from "@/store/useTicketStore";
import { useEffect, useState } from "react";
import PageProps from "@/types/PageProps";

const usePagination = () => {
  const { tickets } = useTicketStore();
  const [pages, setPages] = useState<PageProps[]>([]);
  const [countPages, setCountPages] = useState<number>(1);
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState<PageProps>(pages[0]);

  
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
    if (currentPage?.page === countPages) {
      return null;
    }
    const nextPage = pages.find(p => p.page === currentPage!.page + 1);
    if (nextPage) setCurrentPage(nextPage);
  }

  const goPrevPage = () => {
    if (currentPage?.page === 1) {
      return null;
    }
    const prevPage = pages.find(p => p.page === currentPage!.page - 1);
    if (prevPage) setCurrentPage(prevPage);
  }

  const goPagePressPage = (numberPage: number) => {
    console.log(numberPage);
    
    setCurrentPage(pages[numberPage - 1])
  }

  return {
    countPages, 
    currentPage,
    pages,
    itemsPerPage,
    setCountPages,
    setCurrentPage,
    goNextPage,
    goPrevPage,
    goPagePressPage,
  }
}

export default usePagination;