import React from "react";
import { useSearchParams } from "react-router-dom";
import { PageData } from "../assets/Data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";

interface PaginationProps {
  pageData: PageData;
  setPageData: React.Dispatch<React.SetStateAction<PageData>>;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  pageData,
  setPageData,
  className = "",
}: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pagesArray = Array.from(
    { length: pageData.pages },
    (_, index) => index + 1
  );

  const pageChangeHandler = (page: number) => {
    setPageData((prev) => ({ ...prev, page }));
    setSearchParams({ page: page.toString() });
  };

  const prevPageHandler = () => {
    if (pageData.page > 1) {
      setPageData((prev) => ({ ...prev, page: prev.page - 1 }));
      const currentPage = parseInt(searchParams.get("page") || "1");
      setSearchParams({ page: (currentPage - 1).toString() });
    }
  };

  const nextPageHandler = () => {
    if (pageData.page < pageData.pages) {
      setPageData((prev) => ({ ...prev, page: prev.page + 1 }));
      const currentPage = parseInt(searchParams.get("page") || "1");
      setSearchParams({ page: (currentPage + 1).toString() });
    }
  };

  return (
    <nav aria-label="Page navigation" className={className}>
      <ul className="pagination">
        <li
          className={`page-item ${pageData.page === 1 ? "disabled" : ""}`}
          onClick={prevPageHandler}
          title="Poprzednia strona"
        >
          <span className="page-link">
            <FontAwesomeIcon icon={faAngleLeft} />
          </span>
        </li>
        {pagesArray.map((page: number) => (
          <li
            key={page}
            className={`page-item ${page === pageData.page ? "active" : ""}`}
            onClick={() => pageChangeHandler(page)}
          >
            <span className="page-link">{page}</span>
          </li>
        ))}
        <li
          className={`page-item ${
            pageData.page === pageData.pages ? "disabled" : ""
          }`}
          onClick={nextPageHandler}
          title="Następna strona"
        >
          <span className="page-link">
            <FontAwesomeIcon icon={faAngleRight} />
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
