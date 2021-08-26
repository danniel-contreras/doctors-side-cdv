import { useEffect, useState } from "react";

const Pagination = ({ method, data }) => {
  const [pagination, setPagination] = useState({
    nextPage: 0,
    prevPage: 0,
    currentPage: 0,
    totalPages: 0,
  });
  const [rangePag, setRangePag] = useState(null);
  const range = (start, end, length = end - start + 1) => {
    setRangePag(Array.from({ length }, (_, i) => start + i));
  };
  const setPaginationData = () => {
    setPagination({
      nextPage: data?.nextPage,
      prevPage: data?.prevPage,
      currentPage: data?.currentPage,
      totalPages: data?.totalpages,
    });
    range(1, data?.totalpages);
  };
  useEffect(() => {
    return setPaginationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="flex flex-col items-start my-6">
      <div className="flex text-gray-700">
        <div className="h-8 w-8 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer">
          <button
            className="hover:border-0"
            disabled={pagination?.currentPage === 1}
            onClick={() => method(pagination?.prevPage)}
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
          {rangePag?.map((pag, index) => (
            <div
              onClick={() => method(pag)}
              key={index}
              className={
                (pagination?.currentPage === pag
                  ? "bg-green-500 text-white"
                  : "") +
                " w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full"
              }
            >
              {pag}
            </div>
          ))}
        </div>
        <div className="h-8 w-8 ml-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer">
          <button
            disabled={pagination?.currentPage === pagination?.totalPages}
            onClick={() => method(pagination?.nextPage)}
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
              className="feather feather-chevron-right w-4 h-4"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
