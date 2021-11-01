import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readResultsByQuote } from "../../../redux/actions/result";
import { showImage } from "../../../services/results";
import Modal from "../../Global/Modal";
import AddImage from "./AddImage";
import AddPDF from "./AddPDF";
import SinglePage from "./pdf/Single";

export default function Result({ id }) {
  const [showModal, setShowModal] = useState(false);
  const [showModalPDF, setShowModalPDF] = useState(false);
  const [reload, setreload] = useState(false);
  const dispatch = useDispatch();
  const result = useSelector((state) => state.result.data);
  useEffect(() => {
    return dispatch(readResultsByQuote(id));
  }, [id, dispatch, reload]);
  console.log(result)
  return (
    <div className="mt-2 grid grid-cols-2 w-full">
      <div>
        <p className="text-sm font-normal text-gray-600">
          <span className="font-semibold text-base">Sintomatologia:</span>{" "}
          {result?.symptomatology}
        </p>
        <p className="text-sm font-normal text-gray-600">
          <span className="font-semibold text-base">Diagnostico:</span> {result?.diagnosis}
        </p>
        <p className="text-sm font-normal text-gray-600">
          <span className="font-semibold text-base">Tratamiento:</span> {result?.treatment}
        </p>
        <div className="flex">
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 text-white px-4 text-xs font-semibold py-1 rounded mt-4"
          >
            {result?.img === "results.svg"
              ? "Agregar Imagen"
              : "Cambiar Imagen"}
          </button>
        </div>
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          title="Agregar imagen"
        >
          <AddImage
            setreload={setreload}
            setShowModal={setShowModal}
            id={result?.id}
          />
        </Modal>
        <Modal
          showModal={showModalPDF}
          setShowModal={setShowModalPDF}
          title="Agregar documento PDF"
        >
          <AddPDF
            setreload={setreload}
            setShowModal={setShowModalPDF}
            id={result?.id}
          />
        </Modal>
      </div>
      {result?.img !== "results.svg" && (
        <div className="flex justify-center items-center w-full content-center">
          <img
            className="rounded max-w-96 max-h-96"
            alt=""
            src={showImage(result?.img)}
          />
        </div>
      )}
    </div>
  );
}
