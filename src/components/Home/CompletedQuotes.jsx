import { formatRelative, subDays } from "date-fns";
import { es } from "date-fns/locale";
import { showImage } from "../../services/patients";
import { Link } from "react-router-dom";
import { memo } from "react";

const QuoteList = ({ quotes }) => {
  const filterQuotes =
    quotes?.quotes &&
    quotes?.quotes.map((quote) => quote).filter((quote) => !quote?.state);
  return (
    <>
      {filterQuotes &&
        filterQuotes.map((quote) => (
          <div
            key={quote.id}
            className="bg-white border shadow-md flex flex-col rounded w-full p-6"
          >
            <div className="w-44 shadow rounded  p-3">
              <img
                src={showImage(quote.patients && quote.patients?.img)}
                alt="null"
              />
            </div>
            <span className="text-xl font-light mt-8">
              {quote.patients?.names}
            </span>
            <span className="text-base font-light mt-8">
              {formatRelative(subDays(new Date(quote.date), -1), new Date(), {
                locale: es,
              })}
            </span>
            <Link to={`/quote/${quote.id}`}>
              <button className="bg-blue-600 text-white rounded text-xs py-2 w-full mt-6">
                Ver
              </button>
            </Link>
          </div>
        ))}
    </>
  );
};

export default memo(QuoteList);
