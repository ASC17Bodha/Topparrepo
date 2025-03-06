import { Button } from "react-bootstrap";
import "./Pagination.css";

interface Props {
  page: number;
  totalPages: number;
  onPrevious?: (newPage: number) => void;
  onNext?: (newPage: number) => void;
  onPageSelect?: (selectedPage: number) => void;
  disablePrevious?: boolean;
  disableNext?: boolean;
}

const Pagination = ({
  page,
  totalPages,
  onPrevious = () => {},
  onNext = () => {},
  onPageSelect = () => {},
  disablePrevious = false,
  disableNext = false,
}: Props) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      // If there are 5 or less pages, show all of them
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show the first page
      pages.push(1);

      // Determine if and when to show start ellipsis
      if (page > 3) {
        pages.push("...");
      }

      // Determine window of pages in the middle
      let startPage = Math.max(2, page - 1);
      let endPage = Math.min(totalPages - 1, page + 1);

      // If current page is near the start adjust the window
      if (page <= 3) {
        startPage = 2;
        endPage = 4;
      }
      // If current page is near the end adjust the window
      if (page >= totalPages - 2) {
        startPage = totalPages - 3;
        endPage = totalPages - 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Determine if and when to show end ellipsis
      if (page < totalPages - 2) {
        pages.push("...");
      }

      // Always show the last page
      pages.push(totalPages);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination-container">
      <Button
        className="btn-prev"
        size="sm"
        disabled={disablePrevious || page === 1}
        onClick={() => onPrevious(page - 1)}
      />
      <div className="pagination-group">
        {pageNumbers.map((p, index) =>
          p === "..." ? (
            <span key={index} className="ellipsis">
              ...
            </span>
          ) : (
            <Button
              key={p}
              className={`page-btn ${p === page ? "active" : ""}`}
              size="sm"
              disabled={typeof p === "number" && p > totalPages}
              onClick={() => onPageSelect(p as number)}
            >
              {p}
            </Button>
          )
        )}
      </div>
      <Button
        className="btn-next"
        size="sm"
        disabled={disableNext || page === totalPages}
        onClick={() => onNext(page + 1)}
      />
    </div>
  );
};

export default Pagination;
