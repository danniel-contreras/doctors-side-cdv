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

export default function PestControl({ id,pestControlTypes }) {
  const [page, setPage] = useState(1);
  const pestControls = useSelector((state) => state.pestControl.data);
  const dispatch = useDispatch();
  useEffect(() => {
    return dispatch(readPestControlByPatient(id, page));
  }, [id, dispatch, page]);

  return (
    <>
      {pestControls?.pestControl ? (
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
                      <span className="font-semibold text-base">Duracion:</span>{" "}
                      {pest.duration}
                    </p>
                    <p className="text-sm font-normal">
                      <span className="font-semibold text-base">
                        Tipo de control de plagas:
                      </span>{" "}
                      {pest.pestControlType?.type}
                    </p>
                  </div>
                  <div
                    style={{ width: "10%" }}
                    className="flex justify-center items-center "
                  >
                    <button className="w-10 h-10 flex justify-center rounded-full text-white p-3 bg-red-500">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button className="w-10 mx-5 h-10 flex justify-center rounded-full text-white p-3 bg-green-500">
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
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                  </div>
                  <div style={{ width: "80%" }} className="p-6">
                    <p className="text-sm font-normal">
                      <span className="font-semibold text-base">Duracion:</span>{" "}
                      {pest.duration}
                    </p>
                    <p className="text-sm font-normal">
                      <span className="font-semibold text-base">
                        Tipo de control de plagas:
                      </span>{" "}
                      {pest.pestControlType?.type}
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
              <Pagination data={pestControls} method={setPage} />
            </div>
          ))}
        </div>
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
