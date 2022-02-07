import { faSyringe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readVaccinationsByPatient } from "../../../redux/actions/vaccination";
import { formatRelative, subDays } from "date-fns";
import { es } from "date-fns/locale";
import Pagination from "../../Global/Pagination";

const Vaccinations = ({ id }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const vaccinations = useSelector((state) => state.vaccination.data);
  useEffect(() => {
    return dispatch(readVaccinationsByPatient(id, page));
  }, [dispatch, id, page]);
  console.log(vaccinations);
  return (
    <div className="grid grid-cols-1 gap-4 w-full mt-6">
      <div className="w-full border my-3" />
      {vaccinations?.vaccination ? (
        vaccinations?.vaccination.map((vac, index) => (
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
                <div style={{ width: "90%" }} className="p-6">
                  <p className="text-sm font-normal">
                    <span className="font-semibold text-base">Fecha:</span>{" "}
                    {formatRelative(
                      subDays(new Date(vac.date), 0),
                      new Date(),
                      {
                        locale: es,
                      }
                    )}
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
                      : formatRelative(
                          subDays(new Date(vac.reinforcement), 0),
                          new Date(),
                          {
                            locale: es,
                          }
                        )}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div style={{ width: "90%" }} className="p-6">
                  <p className="text-sm font-normal">
                    <span className="font-semibold text-base">Fecha:</span>{" "}
                    {formatRelative(
                      subDays(new Date(vac.date), 0),
                      new Date(),
                      {
                        locale: es,
                      }
                    )}
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
                      : formatRelative(
                          subDays(new Date(vac.reinforcement), 0),
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
                    icon={faSyringe}
                    className="text-2xl text-white cursor-pointer"
                  />
                </div>
              </>
            )}
          </div>
        ))
      ) : (
        <p className="text-xs font-semibold text-gray-600">
          No hay vacunas que mostrar...{" "}
        </p>
      )}

      <Pagination data={vaccinations} method={setPage} />
    </div>
  );
};

export default Vaccinations;
