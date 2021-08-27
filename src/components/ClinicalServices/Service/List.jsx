import React from "react";
import { showImage } from "../../../services/clinical-services";

export default function List({ clinicalServices, patId }) {
  const filter =
    clinicalServices &&
    clinicalServices.length &&
    clinicalServices.filter((cl) => cl.patientsId === Number(patId));
  return (
    <div className="grid grid-cols-2 gap-5 mt-5">
      {filter &&
        filter.length &&
        filter.map((cs) => (
          <div key={cs.id} className="border rounded p-5">
            <p className="text-xl font-thin">
              <span className="font-normal">Servicio:</span>{" "}
              {cs.clinicalServicesType.type}{" "}
            </p>
            <p className="text-xl font-thin">
              <span className="font-normal">Observacion:</span>{" "}
              {cs.observations}
            </p>
            <p className="text-xl font-normal">Resultado: </p>
            <div className="mt-4">
              {cs.img === "servicios.png" ? (
                <span>
                  No se ah guardado ningun archivo a este servicio....
                </span>
              ) : (
                <img
                  src={showImage(cs.img)}
                  className="rounded"
                  alt="null"
                ></img>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
