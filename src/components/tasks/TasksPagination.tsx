
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface TasksPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const TasksPagination = ({ currentPage, totalPages, onPageChange }: TasksPaginationProps) => {
  const isMobile = useIsMobile();

  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const maxVisible = isMobile ? 3 : 5;
    const halfVisible = Math.floor(maxVisible / 2);
    
    let start = Math.max(1, currentPage - halfVisible);
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-1 mt-6">
      <Button
        variant="outline"
        size={isMobile ? "sm" : "default"}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={isMobile ? "h-8 w-8 p-0" : ""}
      >
        <ChevronLeft size={isMobile ? 14 : 16} />
      </Button>

      {visiblePages[0] > 1 && (
        <>
          <Button
            variant="outline"
            size={isMobile ? "sm" : "default"}
            onClick={() => onPageChange(1)}
            className={isMobile ? "h-8 w-8 p-0" : ""}
          >
            1
          </Button>
          {visiblePages[0] > 2 && (
            <span className="px-2 text-gray-500">...</span>
          )}
        </>
      )}

      {visiblePages.map(page => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          size={isMobile ? "sm" : "default"}
          onClick={() => onPageChange(page)}
          className={isMobile ? "h-8 w-8 p-0" : ""}
        >
          {page}
        </Button>
      ))}

      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="px-2 text-gray-500">...</span>
          )}
          <Button
            variant="outline"
            size={isMobile ? "sm" : "default"}
            onClick={() => onPageChange(totalPages)}
            className={isMobile ? "h-8 w-8 p-0" : ""}
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        variant="outline"
        size={isMobile ? "sm" : "default"}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={isMobile ? "h-8 w-8 p-0" : ""}
      >
        <ChevronRight size={isMobile ? 14 : 16} />
      </Button>
    </div>
  );
};

export default TasksPagination;
