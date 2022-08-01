import React from "react";
import { showImage } from "../../services/patients";
import { formatRelative, subDays } from "date-fns";
import { es } from "date-fns/locale";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClock } from "@fortawesome/free-solid-svg-icons";
import ShowImage from "../Patients/ShowImage";

const List = ({ quotes }) => {
  console.log(quotes);
  return (
    <>
      {" "}
      {quotes && quotes.length ? (
        <div className="grid grid-cols-4 gap-5">
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className="bg-gray-50 shadow border flex flex-col rounded w-full p-6"
            >
              <div className="w-20 shadow rounded  p-3">
                <ShowImage name={quote.patients?.img} />
              </div>
              <span className="text-nomal font-semibold mt-3">
                {quote.patients?.names}
              </span>
              <span className="font-normal text-sm mt-1">
                <span className="font-semibold text-base">
                  Tipo de consulta:{" "}
                </span>{" "}
                {quote.quotesType?.type}
              </span>
              <span className="text-sm font-semibold mt-2">
                {formatRelative(subDays(new Date(quote.date), 0), new Date(), {
                  locale: es,
                })}
              </span>
              <p className="text-sm font-normal mt-1">
                <span className=" font-semibold text-base">Estado:</span>{" "}
                {quote.state ? (
                  <span>
                    Completada
                    <FontAwesomeIcon
                      className="text-green-500 ml-4"
                      icon={faCheck}
                    />
                  </span>
                ) : (
                  <span>
                    Pendiente
                    <FontAwesomeIcon
                      className="text-gray-500 ml-2"
                      icon={faClock}
                    />
                  </span>
                )}
              </p>
              <Link to={`/quote/${quote.id}`}>
                <button className="bg-blue-600 text-white text-xs rounded font-semibold py-1 w-full mt-4">
                  Revisar
                </button>
              </Link>
            </div>
          ))}{" "}
        </div>
      ) : (
        <p className="text-xs font-semibold ">
          No se ah registrado ninguna cita...
        </p>
      )}
    </>
  );
};

export default List;
