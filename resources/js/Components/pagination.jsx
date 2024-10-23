import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  showFirstLast = true,
  className = ''
}) => {

  const getPageNumbers = () => {
    let pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {

      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
     
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, '...', totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
      }
    }
    
    return pages;
  };

  return (
    <div className={`flex items-center justify-center gap-1 ${className}`}>
      {showFirstLast && (
        <button
          className="btn btn-sm btn-ghost"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>
      )}
      
      <button
        className="btn btn-sm btn-ghost"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          className={`btn btn-sm ${
            page === currentPage ? 'btn-primary' : 'btn-ghost'
          }`}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={typeof page !== 'number'}
        >
          {page}
        </button>
      ))}
      
      <button
        className="btn btn-sm btn-ghost"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
      
      {showFirstLast && (
        <button
          className="btn btn-sm btn-ghost"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Pagination;