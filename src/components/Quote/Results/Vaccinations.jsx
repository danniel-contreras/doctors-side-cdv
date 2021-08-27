import { faSyringe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readVaccinationsByPatient } from "../../../redux/actions/vaccination";
import { formatRelative, subDays } from "date-fns";
import { es } from "date-fns/locale";

const Vaccinations = ({ id }) => {
  const dispatch = useDispatch();
  const vaccinations = useSelector((state) => state.vaccination.data);
  useEffect(() => {
    return dispatch(readVaccinationsByPatient(id));
  }, [dispatch, id]);
  return (
    <div className="grid grid-cols-1 gap-4 w-full mt-6">
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
                  <p className="text-xl font-thin">
                    <span className="font-normal">Fecha:</span>{" "}
                    {formatRelative(
                      subDays(new Date(vac.date), 0),
                      new Date(),
                      {
                        locale: es,
                      }
                    )}
                  </p>
                  <p className="text-xl font-thin mt-3">
                    <span className="font-normal">Tipo de vacunacion:</span>
                    {vac.vaccinationType?.type}
                  </p>
                  <p className="text-xl font-thin mt-3">
                    <span className="font-normal">Dosis:</span>
                    {vac.vaccinationDose?.type}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div style={{ width: "90%" }} className="p-6">
                  <p className="text-xl font-thin">
                    <span className="font-normal">Fecha:</span>{" "}
                    {formatRelative(
                      subDays(new Date(vac.date), 0),
                      new Date(),
                      {
                        locale: es,
                      }
                    )}
                  </p>
                  <p className="text-xl font-thin mt-3">
                    <span className="font-normal">Tipo de vacunacion: </span>
                    {vac.vaccinationType?.type}
                  </p>
                  <p className="text-xl font-thin mt-3">
                    <span className="font-normal">Dosis: </span>
                    {vac.vaccinationDose?.type}
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
        <p className="text-xl font-thin">No hay vacunas que mostrar... </p>
      )}
    </div>
  );
};

export default Vaccinations;
