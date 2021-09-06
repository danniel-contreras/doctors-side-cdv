import React from "react";
import { Link } from "react-router-dom";
import { showImage } from "../../services/patients";

export default function List({ patients }) {
  return (
    <div className="grid grid-cols-4 gap-5 mt-8 ">
      {patients?.patients &&
        patients?.patients.map((patient) => (
          <div key={patient?.id} className="p-5 shadow-md rounded border">
            <div>
              <img
                className="w-28 border p-1"
                src={showImage(patient?.img)}
                alt="none"
              />
            </div>
            <div>
              <p className="font-thin text-lg mt-2">
                <span className="font-normal text-base">Nombre:</span>{" "}
                {patient?.names}
              </p>
              <p className="font-thin text-lg mt-2">
                <span className="font-normal text-base">Dueño:</span>{" "}
                {patient?.customers?.names}
              </p>
              <p className="font-thin text-lg mt-2">
                <span className="font-normal text-base">Edad:</span>{" "}
                {patient?.age}
              </p>
              <Link to={`/patient/${patient?.id}`}>
                <button className="bg-blue-500 w-full rounded text-white py-1 font-thin text-lg mt-5">
                  Revisar
                </button>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}
