import React from "react";
import { showImage } from "../../services/patients";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClock } from "@fortawesome/free-solid-svg-icons";

export default function List({ clinicalServices }) {
  return (
    <>
      {clinicalServices &&
        clinicalServices.length &&
        clinicalServices.map((cser) => (
          <div
            key={cser.id}
            className="bg-white shadow flex flex-col rounded w-full h-96 p-6"
          >
            <div className="w-44 shadow rounded  p-3">
              <img
                src={showImage(cser.patients && cser.patients?.img)}
                alt="null"
              />
            </div>
            <span className="text-xl font-light mt-8">
              {cser.patients?.names}
            </span>
            <p className="text-xl font-light mt-4">
              {cser.clinicalServicesType?.type}
            </p>
           {/*} <p className="text-base font-thin mt-4">
             <span className=" font-normal">Estado:</span>{" "}
              {cser.state ? (
                <span>
                  Completada
                  <FontAwesomeIcon className="text-green-500 ml-2" icon={faCheck} />
                </span>
              ) : (
                <span>
                  Pendiente
                  <FontAwesomeIcon className="text-gray-500 ml-4" icon={faClock} />
                </span>
              )}
              </p>*/}
            <Link to={`/service/${cser.id}`}>
              <button className="bg-blue-600 text-white rounded text-xs py-2 w-full mt-6">
                Revisar
              </button>
            </Link>
          </div>
        ))}
    </>
  );
}
