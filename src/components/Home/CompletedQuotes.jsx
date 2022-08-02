import { formatRelative, subDays } from "date-fns";
import { es } from "date-fns/locale";
import { Link } from "react-router-dom";
import { memo } from "react";
import ShowImage from "../Patients/ShowImage";
import Lottie from "lottie-react";
import HappyDog from "../../assets/animations/happy-dog.json";

const QuoteList = ({ quotes }) => {
  const filterQuotes =
    quotes && quotes?.map((quote) => quote).filter((quote) => quote?.state);
  return (
    <>
      {filterQuotes && filterQuotes.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-4 gap-5 mt-4">
          {filterQuotes.map((quote) => (
            <div
              key={quote.id}
              className="bg-white border shadow-md flex flex-col rounded w-full p-6"
            >
              <div className="shadow rounded  p-3">
                <ShowImage name={quote.patients?.img} />
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
          ))}
        </div>
      ) : (
        <>
          <div className="w-full flex justify-center mt-12">
            <div className="flex flex-col">
              <Lottie
                className="w-44"
                animationData={HappyDog}
                loop={true}
                autoPlay={true}
              />
              <p className="font-thin text-xl">Aun no has completado ninguna cita!!</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default memo(QuoteList);
