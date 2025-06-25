
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { useIsMobile } from "@/hooks/use-mobile";

interface TasksPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const TasksPagination = ({ currentPage, totalPages, onPageChange }: TasksPaginationProps) => {
  const isMobile = useIsMobile();

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = isMobile ? 3 : 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const halfVisible = Math.floor(maxVisiblePages / 2);
      let start = Math.max(1, currentPage - halfVisible);
      let end = Math.min(totalPages, currentPage + halfVisible);
      
      if (currentPage <= halfVisible) {
        end = maxVisiblePages;
      } else if (currentPage > totalPages - halfVisible) {
        start = totalPages - maxVisiblePages + 1;
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const pageNumbers = generatePageNumbers();
  const showEllipsisStart = pageNumbers[0] > 1;
  const showEllipsisEnd = pageNumbers[pageNumbers.length - 1] < totalPages;

  return (
    <Pagination className={isMobile ? 'justify-center' : ''}>
      <PaginationContent className={isMobile ? 'gap-1' : ''}>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => onPageChange(currentPage - 1)}
              className={isMobile ? 'text-xs px-2' : ''}
            />
          </PaginationItem>
        )}
        
        {showEllipsisStart && (
          <>
            <PaginationItem>
              <PaginationLink 
                onClick={() => onPageChange(1)}
                className={isMobile ? 'text-xs h-8 w-8' : ''}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis className={isMobile ? 'h-8 w-8' : ''} />
            </PaginationItem>
          </>
        )}
        
        {pageNumbers.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => onPageChange(page)}
              isActive={page === currentPage}
              className={isMobile ? 'text-xs h-8 w-8' : ''}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        
        {showEllipsisEnd && (
          <>
            <PaginationItem>
              <PaginationEllipsis className={isMobile ? 'h-8 w-8' : ''} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink 
                onClick={() => onPageChange(totalPages)}
                className={isMobile ? 'text-xs h-8 w-8' : ''}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext 
              onClick={() => onPageChange(currentPage + 1)}
              className={isMobile ? 'text-xs px-2' : ''}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default TasksPagination;
