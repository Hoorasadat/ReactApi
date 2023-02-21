import "./pagination.scss";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import usePagination, { DOTS } from "./hooks/usePagination";

import PropTypes from "prop-types";
import React, { useMemo } from "react";
import { nanoid } from "nanoid";

function Pagination({
  currentPage,
  lastPage,
  onPageChange,
  onPageSizeOptionChange,
  pageSize,
  pageSizeOptions,
  totalCount
}) {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const paginationRange = useMemo(() => usePagination(
    currentPage,
    pageSize,
    totalCount,
  ), [currentPage, pageSize, totalCount]);

  const onNext = () => {
    onPageChange(currentPage + 1, pageSize);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1, pageSize);
  };

  return (
    <ul
      className="wrapper"
      aria-label="Blog post pagination list"
    >
      <li className="paginationItem">
        <button
          type="button"
          className="arrowButton left"
          aria-label="Goto previous page"
          onClick={onPrevious}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon />
        </button>
      </li>

      {paginationRange.map((pageNumber) => {
        const key = nanoid();

        if (pageNumber === DOTS) {
          return (
            <li key={key} className="dots">
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={key}
            className="paginationItem"
            aria-current={pageNumber===currentPage
              ? "page" : "false"}
          >
            <button
              type="button"
              aria-label={`Goto page ${pageNumber}`}
              onClick={(e) => onPageChange(parseInt(e.target.innerText), pageSize)}
            >
              {pageNumber}
            </button>
          </li>
        );
      })}

      <li className="paginationItem">
        <button
          type="button"
          className="arrowButton right"
          aria-label="Goto next page"
          onClick={onNext}
          disabled={currentPage === lastPage}
        >
          <ChevronRightIcon />
        </button>
      </li>

      <select
        className="paginationSelector"
        aria-label="Select page size"
        onChange={(e) => {
          onPageSizeOptionChange(parseInt(e.target.value));
        }}
      >
        {pageSizeOptions.map((size) => (
          <option key={size} defaultValue={pageSize === size} value={size}>
            {size} per page
          </option>
        ))}
      </select>
    </ul>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  lastPage: PropTypes.number,
  onPageChange: PropTypes.func,
  onPageSizeOptionChange: PropTypes.func,
  pageSize: PropTypes.number,
  pageSizeOptions: PropTypes.instanceOf(Array),
  totalCount: PropTypes.number,
};

Pagination.defaultProps = {
  currentPage: 1,
  lastPage: 44,
  onPageChange: () => {},
  onPageSizeOptionChange: () => {},
  pageSize: 15,
  pageSizeOptions: [15, 25, 50, 100],
  totalCount: 1,
};

export default Pagination;
