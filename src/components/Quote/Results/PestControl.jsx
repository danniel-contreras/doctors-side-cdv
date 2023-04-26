import {
  faNotesMedical,
  faTrash,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readPestControlByPatient } from "../../../redux/actions/pest-control";
import Pagination from "../../Global/Pagination";
import Lottie from "lottie-react";
import CuteDog from "../../../assets/animations/animation-for-website.json";
import Modal from "../../Global/Modal";
import PestControlEditForm from "./Edit/PestControlEditForm";
import { Success } from "../../Global/Alerts/Success";
import { Error } from "../../Global/Alerts/Error";
import { deletePestControl } from "../../../services/pest-control";
import { format } from "date-fns";

export default function PestControl({ id, pestControlTypes }) {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [pestcontrol, setPestcontrol] = useState();
  const pestControls = useSelector((state) => state.pestControl.data);
  const dispatch = useDispatch();
  useEffect(() => {
    return dispatch(readPestControlByPatient(id, page));
  }, [id, dispatch, page]);

  const editPest = (pest) => {
    setShowModal(!showModal);
    setPestcontrol(pest);
  };

  const deletePest = (pest) => {
    setShowModalDelete(true);
    setPestcontrol(pest);
  };

  const handleDelete = () => {
    const data = {
      id: pestcontrol?.id,
      state: false,
    };
    deletePestControl(data)
      .then(() => {
        dispatch(readPestControlByPatient(id, 1));
        Success("Se ah elimino el registro");
        setShowModalDelete(false);
      })
      .catch((error) => {
        console.log(error)
        Error("Ah ocurrido un error inesperado");
      });
  };

  return (
    <>
      {pestControls?.pestControl ? (
        <>
          <div className="grid grid-cols-1 gap-4 w-full mt-6">
            {pestControls?.pestControl.map((pest, index) => (
              <div
                key={pest.id}
                className=" shadow-md flex border rounded-lg my-3"
              >
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
                      {format(new Date(pest.date), "dd/MM/yyyy")}
                    </p>
                      <p className="text-sm font-normal">
                        <span className="font-semibold text-base">
                          Duracion:
                        </span>{" "}
                        {pest.duration}
                      </p>
                      <p className="text-sm font-normal">
                        <span className="font-semibold text-base">
                          Tipo de control de ectoparasitos:
                        </span>{" "}
                        {pest.pestControlType?.type}
                      </p>
                      <p className="text-sm font-normal">
                      <span className="font-semibold text-base">Refuerzo:</span>
                      {pest.reinforcement === "N/A" || pest.reinforcement === ""
                        ? "N/A"
                        : format(new Date(pest.reinforcement), "dd/MM/yyyy")}
                    </p>
                    </div>
                    <div
                      style={{ width: "10%" }}
                      className="flex justify-center items-center "
                    >
                      <button
                        onClick={() => deletePest(pest)}
                        className="w-10 h-10 flex justify-center rounded-full text-white p-3 bg-red-500"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <button
                        onClick={() => editPest(pest)}
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
                      <button
                        onClick={() => deletePest(pest)}
                        className="w-10 h-10 flex justify-center rounded-full text-white p-3 bg-red-500"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <button className="w-10 mx-5 h-10 flex justify-center rounded-full text-white p-3 bg-green-500">
                        <FontAwesomeIcon
                          onClick={() => editPest(pest)}
                          icon={faPen}
                        />
                      </button>
                    </div>
                    <div style={{ width: "80%" }} className="p-6">
                    <p className="text-sm font-normal">
                      <span className="font-semibold text-base">Fecha:</span>{" "}
                      {format(new Date(pest.date), "dd/MM/yyyy")}
                    </p>
                      <p className="text-sm font-normal">
                        <span className="font-semibold text-base">
                          Duracion:
                        </span>{" "}
                        {pest.duration}
                      </p>
                      <p className="text-sm font-normal">
                        <span className="font-semibold text-base">
                          Tipo de control de ectoparasitos:
                        </span>{" "}
                        {pest.pestControlType?.type}
                      </p>
                      <p className="text-sm font-normal">
                      <span className="font-semibold text-base">Refuerzo:</span>
                      {pest.reinforcement === "N/A" || pest.reinforcement === ""
                        ? "N/A"
                        : format(new Date(pest.reinforcement), "dd/MM/yyyy")}
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
          </div>
          <Modal
            setShowModal={setShowModal}
            showModal={showModal}
            title="Actualizar control de plagas"
          >
            <PestControlEditForm
              setShowModal={setShowModal}
              pest={pestcontrol}
              pestControlTypes={pestControlTypes}
            />
          </Modal>
          <Modal
            setShowModal={setShowModalDelete}
            showModal={showModalDelete}
            title="Eliminar control de plagas"
          >
            <div>
              <p>¿Estas seguro de eliminar este registro?</p>
              <div className="grid grid-cols-2 gap-6 mt-3">
                <button
                  onClick={handleDelete}
                  className="bg-blue-500 text-white px-6 py-2 text-sm rounded"
                >
                  Si, eliminar
                </button>
                <button
                  onClick={() => setShowModalDelete(false)}
                  className="bg-red-500 text-white px-6 py-2 text-sm rounded"
                >
                  No, cancelar
                </button>
              </div>
            </div>
          </Modal>
          <Pagination data={pestControls} method={setPage} />
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
    </>
  );
}
