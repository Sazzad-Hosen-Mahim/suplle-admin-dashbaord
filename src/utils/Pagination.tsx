import { useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  data: unknown[];
  itemsPerPage: number;
  onPageChange: (items: unknown[]) => void;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const Pagination = ({ 
  data, 
  itemsPerPage = 5, 
  onPageChange,
  currentPage,
  setCurrentPage 
}: PaginationProps) => {
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Update parent component when page changes
  useEffect(() => {
    onPageChange(paginatedItems);
  }, [currentPage, data, onPageChange, paginatedItems]);

  return (
    <div className="flex justify-end items-center gap-2 mt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentPage((p: number) => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      {[...Array(totalPages)].map((_, idx) => (
        <Button
          key={idx}
          size="sm"
          variant={currentPage === idx + 1 ? "default" : "outline"}
          onClick={() => setCurrentPage(idx + 1)}
        >
          {idx + 1}
        </Button>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentPage((p: number) => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;