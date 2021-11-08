import { formatRelative, subDays } from "date-fns";
import { es } from "date-fns/locale";
import { showImage } from "../../services/patients";
import { Link } from "react-router-dom";
import { memo } from "react";

const QuoteList = ({ quotes }) => {
  const filterQuotes =
    quotes && quotes?.map((quote) => quote).filter((quote) => quote?.state);
  return (
    <>
      {filterQuotes && filterQuotes.length ? (
        filterQuotes.map((quote) => (
          <div
            key={quote.id}
            className="bg-white border shadow-md flex flex-col rounded w-full p-6"
          >
            <div className="w-20 shadow rounded  p-3">
              <img
                src={showImage(quote.patients && quote.patients?.img)}
                alt="null"
              />
            </div>
            <span className="text-base font-semibold mt-4">
              {quote.patients?.names}
            </span>
            <span className="font-normal text-sm mt-1">
              <span className="font-semibold text-base">
                Tipo de consulta:{" "}
              </span>{" "}
              {quote.quotesType?.type}
            </span>
            <span className="text-sm font-semibold mt-4">
              {formatRelative(subDays(new Date(quote.date), 0), new Date(), {
                locale: es,
              })}
            </span>
            <Link to={`/quote/${quote.id}`}>
              <button className="bg-blue-600 text-white rounded text-xs py-1 font-semibold w-full mt-6">
                Ver
              </button>
            </Link>
          </div>
        ))
      ) : (
        <p className="text-base font-thin">No has completado ninguna cita...</p>
      )}
    </>
  );
};

export default memo(QuoteList);
