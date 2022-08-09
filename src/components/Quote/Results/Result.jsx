import { faTrash, faPen, faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readResultsByQuote } from "../../../redux/actions/result";
import Modal from "../../Global/Modal";
import AddImage from "./AddImage";
import ResultEditForm from "./Edit/ResultEditForm";
import Carousel from "./Carousel";
import { getPhotos } from "../../../services/results";
import { deleteQuote } from "../../../services/quotes";
import { Error } from "../../Global/Alerts/Error";
import { Success } from "../../Global/Alerts/Success";

export default function Result({ id }) {
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [reload, setreload] = useState(false);
  const [newImg, setNewImg] = useState(1);
  const [photos, setPhotos] = useState([]);
  const editResult = () => {
    setShowModalEdit(!showModal);
  };

  const dispatch = useDispatch();
  const result = useSelector((state) => state.result.data);
  useEffect(() => {
    return dispatch(readResultsByQuote(id));
  }, [id, dispatch, reload]);

  useEffect(() => {
    const showPhotos = () => {
      if (result?.id) {
        getPhotos(result.id, newImg).then((res) => {
          setPhotos(res);
        });
      }
    };
    return showPhotos();
  }, [result, newImg]);

  const handleDelete = () => {
    const data = {
      id: result?.id,
      state: false,
    };
    deleteQuote(data)
      .then(() => {
        Success("Se elimino correctamente!!");
        dispatch(readResultsByQuote(id));
        setModalDelete(false);
      })
      .catch(() => {
        Error("Ah ocurrido un error inesperado!!");
      });
  };

  return (
    <>
      {result?.state && (
        <div className="mt-2 grid grid-cols-1 xl:grid-cols-2 w-full">
          <div>
            <p className="text-sm font-normal text-gray-600">
              <span className="font-semibold text-base">Sintomatologia:</span>{" "}
              {result?.symptomatology}
            </p>
            <p className="text-sm font-normal text-gray-600">
              <span className="font-semibold text-base">Diagnostico:</span>{" "}
              {result?.diagnosis}
            </p>
            <p className="text-sm font-normal text-gray-600">
              <span className="font-semibold text-base">Tratamiento:</span>{" "}
              {result?.treatment}
            </p>
            <Modal
              showModal={showModalEdit}
              setShowModal={setShowModalEdit}
              title="Editar resultado"
            >
              <ResultEditForm setShowModal={setShowModalEdit} res={result} />
            </Modal>
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
            <div className="flex mt-4">
              <button
                onClick={() => setModalDelete(true)}
                className="w-10 h-10 flex justify-center rounded-full text-white p-3 bg-red-500"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button
                onClick={editResult}
                className="w-10 mx-5 h-10 flex justify-center rounded-full text-white p-3 bg-green-500"
              >
                <FontAwesomeIcon icon={faPen} />
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="w-10 h-10 flex justify-center rounded-full text-white p-3 bg-blue-500"
              >
                <FontAwesomeIcon icon={faCamera} />
              </button>
            </div>
          </div>
          <div>
            <Carousel page={newImg} setpage={setNewImg} photos={photos} />
          </div>
          <Modal
            showModal={modalDelete}
            setShowModal={setModalDelete}
            title="Eliminar consulta"
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
                  onClick={() => setModalDelete(false)}
                  className="bg-red-500 text-white px-6 py-2 text-sm rounded"
                >
                  No, cancelar
                </button>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
}
