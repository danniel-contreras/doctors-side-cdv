import React from "react";
import { showImage } from "../../services/patients";
import { formatRelative, subDays } from "date-fns";
import { es } from "date-fns/locale";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClock } from "@fortawesome/free-solid-svg-icons";

const List = ({ quotes }) => {
  console.log(quotes)
  return (
    <>     {quotes && quotes.length ? (
        <div className="grid grid-cols-4 gap-5">
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className="bg-gray-50 shadow-md border flex flex-col rounded w-full p-6"
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
              <span className="font-light mt-8">
                <span className="font-normal">Tipo de consulta: </span> {quote.quotesType?.type}
              </span>
              <span className="text-base font-light mt-4">
                {formatRelative(subDays(new Date(quote.date), 0), new Date(), {
                  locale: es,
                })}
              </span>
              <p className="text-base font-thin mt-4">
                <span className=" font-normal">Estado:</span>{" "}
                {quote.state ? (
                  <span>
                    Pendiente
                    <FontAwesomeIcon
                      className="text-gray-500 ml-2"
                      icon={faClock}
                    />
                  </span>
                ) : (
                  <span>
                    Completada
                    <FontAwesomeIcon
                      className="text-green-500 ml-4"
                      icon={faCheck}
                    />
                  </span>
                )}
              </p>
              <Link to={`/quote/${quote.id}`}>
                <button className="bg-blue-600 text-white rounded text-xs py-2 w-full mt-6">
                  Revisar
                </button>
              </Link>
            </div>
          ))}{" "}
        </div>
      ) : (
        <p className="text-base font-thin">
          No se ah registrado ninguna cita...
        </p>
      )}
    </>
  );
};

export default List;
