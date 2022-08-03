import { faSyringe, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readVaccinationsByPatient } from "../../../redux/actions/vaccination";
import { format } from "date-fns";
import Pagination from "../../Global/Pagination";
import Modal from "../../Global/Modal";
import VacinationEditForm from "./Edit/VacinationEditForm";
import Lottie from "lottie-react";
import CuteDog from "../../../assets/animations/animation-for-website.json";

const Vaccinations = ({ id, vaccinationDoses, vaccinationTypes }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [vaccination, setVaccination] = useState();
  const vaccinations = useSelector((state) => state.vaccination.data);
  useEffect(() => {
    return dispatch(readVaccinationsByPatient(id, page));
  }, [dispatch, id, page]);

  const vaccinationEdit = (vacc) => {
    setVaccination(vacc);
    setShowModal(!showModal);
  };

  return (
    <div className="grid grid-cols-1 gap-4 w-full mt-6">
      <div className="w-full border my-3" />
      {vaccinations?.vaccination ? (
        <>
          {vaccinations?.vaccination.map((vac, index) => (
            <div key={vac.id} className=" shadow-md flex border rounded-lg">
              {index % 2 === 0 || index === 0 ? (
                <>
                  <div
                    style={{ width: "10%" }}
                    className="bg-blue-500 rounded-tl-lg rounded-bl-lg flex justify-center items-center "
                  >
                    <FontAwesomeIcon
                      icon={faSyringe}
                      className="text-2xl text-white cursor-pointer"
                    />
                  </div>
                  <div style={{ width: "80%" }} className="p-6">
                    <p className="text-sm font-normal">
                      <span className="font-semibold text-base">Fecha:</span>{" "}
                      {format(new Date(vac.date), "dd/MM/yyyy")}
                    </p>
                    <p className="text-sm font-normal mt-3">
                      <span className="font-semibold text-base">
                        Tipo de vacunacion:
                      </span>
                      {vac.vaccinationType?.type}
                    </p>
                    <p className="text-sm font-normal mt-3">
                      <span className="font-semibold text-base">Dosis:</span>
                      {vac.vaccinationDose?.type}
                    </p>
                    <p className="text-sm font-normal mt-3">
                      <span className="font-semibold text-base">Refuerzo:</span>
                      {vac.reinforcement === "N/A"
                        ? vac.reinforcement
                        : format(new Date(vac.reinforcement), "dd/MM/yyyy")}
                    </p>
                  </div>
                  <div
                    style={{ width: "10%" }}
                    className="flex justify-center items-center "
                  >
                    <button className="w-10 h-10 flex justify-center rounded-full text-white p-3 bg-red-500">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      onClick={() => vaccinationEdit(vac)}
                      className="w-10 mx-5 h-10 flex justify-center rounded-full text-white p-3 bg-green-500"
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{ width: "10%" }}
                    className="flex mx-3 justify-center items-center "
                  >
                    <button className="w-10 h-10 flex justify-center rounded-full text-white p-3 bg-red-500">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      onClick={() => vaccinationEdit(vac)}
                      className="w-10 mx-5 h-10 flex justify-center rounded-full text-white p-3 bg-green-500"
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                  </div>
                  <div style={{ width: "80%" }} className="p-6">
                    <p className="text-sm font-normal">
                      <span className="font-semibold text-base">Fecha:</span>{" "}
                      {format(new Date(vac.date), "dd/MM/yyyy")}
                    </p>
                    <p className="text-sm font-normal mt-3">
                      <span className="font-semibold text-base">
                        Tipo de vacunacion:
                      </span>
                      {vac.vaccinationType?.type}
                    </p>
                    <p className="text-sm font-normal mt-3">
                      <span className="font-semibold text-base">Dosis:</span>
                      {vac.vaccinationDose?.type}
                    </p>
                    <p className="text-sm font-normal mt-3">
                      <span className="font-semibold text-base">Refuerzo:</span>
                      {vac.reinforcement === "N/A" || vac.reinforcement === ""
                        ? "N/A"
                        : format(new Date(vac.reinforcement), "dd/MM/yyyy")}
                    </p>
                  </div>
                  <div
                    style={{ width: "10%" }}
                    className="bg-blue-500 w-28 rounded-tr-lg rounded-br-lg flex justify-center items-center "
                  >
                    <FontAwesomeIcon
                      icon={faSyringe}
                      className="text-2xl text-white cursor-pointer"
                    />
                  </div>
                </>
              )}
            </div>
          ))}
          <Pagination data={vaccinations} method={setPage} />
        </>
      ) : (
        <div className="w-full flex justify-center">
          <div>
            <Lottie
              animationData={CuteDog}
              className="w-44"
              loop={true}
              autoplay={true}
            />
            <p className="text-cxl font-thin">Aun no tienes resultados!!!</p>
          </div>
        </div>
      )}

      <Modal
        title="Actualizar vacunacion"
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <VacinationEditForm
          vacc={vaccination}
          vaccinationDoses={vaccinationDoses}
          vaccinationTypes={vaccinationTypes}
          setShowModal={setShowModal}
        />
      </Modal>
    </div>
  );
};

export default Vaccinations;
