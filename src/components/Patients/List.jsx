import React from "react";
import { Link } from "react-router-dom";
import { showImage } from "../../services/patients";

export default function List({ patients }) {
  console.log(patients)
  return (
    <div className="grid grid-cols-5 gap-5 mt-8 ">
      {patients?.patients &&
        patients?.patients.map((patient) => (
          <div key={patient?.id} className="px-5 py-3 bg-white shadow-md rounded border">
            <div>
              <img
                className=" w-20 border p-1"
                src={showImage(patient?.img)}
                alt="none"
              />
            </div>
            <div>
              <p className="font-normal text-xs mt-2">
                <span className="font-semibold text-base">Nombre:</span>{" "}
                {patient?.names}
              </p>
              <p className="font-normal text-xs mt-2">
                <span className="font-semibold text-base">Dueño:</span>{" "}
                {patient?.customers?.names} {patient?.customers?.lastname}
              </p>
              <p className="font-normal text-xs mt-2">
                <span className="font-semibold text-base">Edad:</span>{" "}
                {patient?.age}
              </p>
              <Link to={`/patient/${patient?.id}`}>
                <button className="bg-blue-500 w-full rounded text-white py-1 font-semibold text-xs  mt-5">
                  Revisar
                </button>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}
