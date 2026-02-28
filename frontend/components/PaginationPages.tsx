import PageProps from "@/types/PageProps";

interface PaginationComponentProps {
  pages: PageProps[];
  currentPage: PageProps;
  goNextPage(): void;  
  goPrevPage(): void;
  goPagePressPage(pageNumber: number): void;
}

const PaginationPages = ({pages, currentPage, goNextPage, goPrevPage, goPagePressPage}: PaginationComponentProps) => {
  return (
    <div className="flex justify-center mt-auto">
      <div className="flex gap-2">
        <button onClick={goPrevPage}>{'<'}</button>
        {pages.map((page: PageProps) => (
          <div 
            key={page.page} 
            className={`animate-page-button border border-[#1A1A1A] p-2 rounded-lg bg-[#D5BDAF] ${currentPage?.page === page.page ? 'bg-[#F5EBE0]' : ''}`}
          >
            <button 
              className={`w-8 h-8 font-semibold transition-colors duration-200 ${
                currentPage?.page === page.page ? 'text-[#1A1A1A]' : 'text-white'
              }`}
              onClick={() => goPagePressPage(page.page)}
            >
              {page.page}
            </button>
          </div>
        ))}
         <button onClick={goNextPage}>{'>'}</button>
      </div>
    </div>
  );
}

export default PaginationPages;