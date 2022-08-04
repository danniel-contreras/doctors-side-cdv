import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClock } from "@fortawesome/free-solid-svg-icons";
import ShowImage from "../Patients/ShowImage";
import Lottie from "lottie-react";
import KittenCrying from "../../assets/animations/kitten-crying.json";

const List = ({ quotes }) => {
  return (
    <>
      {" "}
      {quotes && quotes.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-8 ">
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className="bg-gray-50 shadow border flex flex-col rounded w-full p-6"
            >
              <div>
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
                {format(new Date(quote.date), "dd-MM-yyyy")}
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
        <div className="flex flex-col justify-center items-center">
          <Lottie
            className="w-64"
            animationData={KittenCrying}
            loop={true}
            autoPlay={true}
          />
          <p className="text-xl font-thin">No se an encontrado resultados!!</p>
        </div>
      )}
    </>
  );
};

export default List;
