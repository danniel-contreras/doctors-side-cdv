import { useEffect, useState } from "react";
import { usePagination, DOTS } from "../../hooks/usePagination";
import "./Pagination.css";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 4,
    currentPage,
    pageSize,
    last,
  } = props;

  const [pagination, setPagination] = useState({
    totalCount: 0,
    currentPage: 0,
    pageSize: 0,
    last: 0,
  });

  useEffect(() => {
    return setPagination({
      totalCount: totalCount,
      currentPage: currentPage,
      pageSize: pageSize,
      last: last,
    });
  }, [last, totalCount, currentPage, pageSize]);

  const paginationRange = usePagination({
    currentPage: pagination.currentPage,
    totalCount: pagination.totalCount,
    siblingCount,
    pageSize: pagination.pageSize,
  });

  if (pagination.currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(pagination.currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(pagination.currentPage - 1);
  };

  return (
    <div className="flex flex-col items-start my-6">
      <ul className="flex text-gray-700">
        <div className="h-8 w-8 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer">
          <button
            className="hover:border-0"
            disabled={pagination.currentPage === 1}
            onClick={onPrevious}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-chevron-left w-4 h-4"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        </div>
        <div className="flex h-8 font-medium rounded-full bg-gray-200">
          {paginationRange?.map((pageNumber) => {
            return (
              <li
                key={pageNumber}
                className={
                  (pagination.currentPage === pageNumber
                    ? "bg-green-500 text-white"
                    : "") +
                  " w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full"
                }
                onClick={() => pageNumber !== DOTS && onPageChange(pageNumber)}
              >
                {pageNumber}
              </li>
            );
          })}
        </div>
        <div className="h-8 w-8 ml-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer">
          <button disabled={pagination.currentPage === last} onClick={onNext}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-chevron-right w-4 h-4"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </ul>
    </div>
  );
};

export default Pagination;
