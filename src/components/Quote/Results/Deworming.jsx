import {
  faNotesMedical,
  faTrash,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { readDewormingsByPatient } from "../../../redux/actions/deworming";
import { formatRelative, subDays } from "date-fns";
import { es } from "date-fns/locale";
import Pagination from "../../Global/Pagination";

const Deworming = ({ id }) => {
  const dewormings = useSelector((state) => state.deworming.data);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    return dispatch(readDewormingsByPatient(id, page));
  }, [id, dispatch, page]);
  return (
    <div className="grid grid-cols-1 gap-4 w-full mt-6">
      {dewormings?.deworming ? (
        dewormings?.deworming.map((dwm, index) => (
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
                    {formatRelative(
                      subDays(new Date(dwm.date), 0),
                      new Date(),
                      {
                        locale: es,
                      }
                    )}
                  </p>
                  <p className="text-sm font-normal">
                    <span className="font-semibold text-base">
                      Tipo de desparacitacion:
                    </span>{" "}
                    {dwm.dewormingType?.type}
                  </p>
                  <p className="text-sm font-normal">
                    <span className="font-semibold text-base">Refuerzo:</span>
                    {dwm.reinforcement === "N/A" || dwm.reinforcement === ""
                      ? "N/A"
                      : formatRelative(
                          subDays(new Date(dwm.reinforcement), 0),
                          new Date(),
                          {
                            locale: es,
                          }
                        )}
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
                    <span className="font-semibold text-base">Fecha:</span>{" "}
                    {formatRelative(
                      subDays(new Date(dwm.date), 0),
                      new Date(),
                      {
                        locale: es,
                      }
                    )}
                  </p>
                  <p className="text-sm font-normal">
                    <span className="font-semibold text-base">
                      Tipo de desparacitacion:
                    </span>{" "}
                    {dwm.dewormingType?.type}
                  </p>
                  <p className="text-sm font-normal">
                    <span className="font-semibold text-base">Refuerzo:</span>
                    {dwm.reinforcement === "N/A" || dwm.reinforcement === ""
                      ? "N/A"
                      : formatRelative(
                          subDays(new Date(dwm.reinforcement), 0),
                          new Date(),
                          {
                            locale: es,
                          }
                        )}
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
        ))
      ) : (
        <p className="text-xs font-semibold text-gray-600">
          No hay desparacitaciones que mostrar...{" "}
        </p>
      )}
      <Pagination data={dewormings} method={setPage} />
    </div>
  );
};

export default Deworming;
