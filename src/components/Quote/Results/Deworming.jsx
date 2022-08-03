import {
  faNotesMedical,
  faTrash,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { readDewormingsByPatient } from "../../../redux/actions/deworming";
import { format } from "date-fns";
import Pagination from "../../Global/Pagination";
import Modal from "../../Global/Modal";
import DewormingEditForm from "./Edit/DewormingEditForm";
import Lottie from "lottie-react";
import CuteDog from "../../../assets/animations/animation-for-website.json";

const Deworming = ({ id, dewormingTypes }) => {
  const dewormings = useSelector((state) => state.deworming.data);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [deworming, setDeworming] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    return dispatch(readDewormingsByPatient(id, page));
  }, [id, dispatch, page]);

  const editDeworming = (dwm) => {
    setDeworming(dwm);
    setShowModal(!showModal);
  };
  return (
    <div className="grid grid-cols-1 gap-4 w-full mt-6">
      {dewormings?.deworming ? (
        <>
          {dewormings?.deworming.map((dwm, index) => (
            <div key={dwm.id} className=" shadow-md flex border rounded-lg">
              {index % 2 === 0 || index === 0 ? (
                <>
                  <div
                    style={{ width: "10%" }}
                    className="bg-blue-500 rounded-tl-lg rounded-bl-lg flex justify-center items-center "
                  >
                    <FontAwesomeIcon
                      icon={faNotesMedical}
                      className="text-2xl text-white cursor-pointer"
                    />
                  </div>
                  <div style={{ width: "80%" }} className="p-6">
                    <p className="text-sm font-normal">
                      <span className="font-semibold text-base">Fecha:</span>{" "}
                      {format(new Date(dwm.date), "dd/MM/yyyy")}
                    </p>
                    <p className="text-sm font-normal">
                      <span className="font-semibold text-base">
                        Tipo de desparacitacion:
                      </span>{" "}
                      {dwm.dewormingType?.type} - {dwm.dewormingType?.brand}
                    </p>
                    <p className="text-sm font-normal">
                      <span className="font-semibold text-base">Refuerzo:</span>
                      {dwm.reinforcement === "N/A" || dwm.reinforcement === ""
                        ? "N/A"
                        : format(new Date(dwm.reinforcement), "dd/MM/yyyy")}
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
                      onClick={() => editDeworming(dwm)}
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
                    className="flex mx-4 justify-center items-center "
                  >
                    <button className="w-10 h-10 flex justify-center rounded-full text-white p-3 bg-red-500">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button className="w-10 mx-5 h-10 flex justify-center rounded-full text-white p-3 bg-green-500">
                      <FontAwesomeIcon
                        onClick={() => editDeworming(dwm)}
                        icon={faPen}
                      />
                    </button>
                  </div>
                  <div style={{ width: "80%" }} className="p-6">
                    <p className="text-sm font-normal">
                      <span className="font-semibold text-base">Fecha:</span>{" "}
                      {format(new Date(dwm.date), "dd/MM/yyyy")}
                    </p>
                    <p className="text-sm font-normal">
                      <span className="font-semibold text-base">
                        Tipo de desparacitacion:
                      </span>{" "}
                      {dwm.dewormingType?.type} - {dwm.dewormingType?.brand}
                    </p>
                    <p className="text-sm font-normal">
                      <span className="font-semibold text-base">Refuerzo:</span>
                      {dwm.reinforcement === "N/A" || dwm.reinforcement === ""
                        ? "N/A"
                        : format(new Date(dwm.reinforcement), "dd/MM/yyyy")}
                    </p>
                  </div>
                  <div
                    style={{ width: "10%" }}
                    className="bg-blue-500 w-28 rounded-tr-lg rounded-br-lg flex justify-center items-center "
                  >
                    <FontAwesomeIcon
                      icon={faNotesMedical}
                      className="text-2xl text-white cursor-pointer"
                    />
                  </div>
                </>
              )}
            </div>
          ))}
          <Pagination data={dewormings} method={setPage} />
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
        setShowModal={setShowModal}
        title="Editar desparacitacion"
        showModal={showModal}
      >
        <DewormingEditForm
          setShowModal={setShowModal}
          dwm={deworming}
          dewormingTypes={dewormingTypes}
        />
      </Modal>
    </div>
  );
};

export default Deworming;
