import { formatRelative, subDays } from "date-fns";
import { es } from "date-fns/locale";
import { showImage } from "../../services/patients";
import { Link } from "react-router-dom";
import { memo } from "react";

const QuoteList = ({ quotes }) => {
  const filterQuotes =
    quotes &&
    quotes?.map((quote) => quote).filter((quote) => quote?.state);
  return (
    <>
      {filterQuotes && filterQuotes.length ? (
        filterQuotes.map((quote) => (
          <div
            key={quote.id}
            className="shadow border flex flex-col rounded w-full p-6"
          >
            <div className="w-28 shadow rounded  p-3">
              <img
                src={showImage(quote.patients && quote.patients?.img)}
                alt="null"
              />
            </div>
            <span className="text-xl font-light mt-8">
              {quote.patients?.names}
            </span>
            <span className="text-base font-light mt-8">
              {formatRelative(subDays(new Date(quote.date), 0), new Date(), {
                locale: es,
              })}
            </span>
            <Link to={`/quote/${quote.id}`}>
              <button className="bg-blue-600 text-white rounded text-xs py-2 w-full mt-6">
                Revisar
              </button>
            </Link>
          </div>
        ))
      ) : (
        <p className="text-base font-thin">No hay citas pendientes...</p>
      )}
    </>
  );
};

export default memo(QuoteList);
