import { useState } from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";
import Modal from "../Global/Modal";
import NewQuoteByPatient from "./NewQuoteByPatient";

export default function List({ patients }) {
  const [showModal, setShowModal] = useState(false);
  const [patientToQuote, setPatientToQuote] = useState();
  const handleNew = (patient) => {
    setPatientToQuote(patient);
    setShowModal(!showModal);
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-8 ">
      {patients?.patients &&
        patients?.patients.map((patient) => (
          <div
            key={patient?.id}
            className="px-5 flex w-full py-3 bg-white shadow-md rounded-xl border"
          >
            <div className="p-3 flex justify-center items-center" style={{ width: "40%" }}>
              <ShowImage
                cssClass="h-52 w-auto border p-1"
                name={patient?.img}
              />
            </div>
            <div className="px-6 " style={{ width: "60%" }}>
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
              <div className="flex w-full flex-col">
                <Link to={`/patient/${patient?.id}`}>
                  <button className="bg-green-500 w-full rounded-xl text-white py-3 font-semibold text-xs  mt-5">
                    Revisar
                  </button>
                </Link>
                <button
                  onClick={() => handleNew(patient)}
                  className="bg-blue-500 w-full rounded-xl text-white py-3 font-semibold text-xs  mt-2"
                >
                  Añadir consulta
                </button>
              </div>
            </div>
          </div>
        ))}
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        title="Añadir consulta"
      >
        <NewQuoteByPatient patient={patientToQuote} />
      </Modal>
    </div>
  );
}
