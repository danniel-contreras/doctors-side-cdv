import { faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { readDewormingsByPatient } from "../../../redux/actions/deworming";
import { formatRelative, subDays } from "date-fns";
import { es } from "date-fns/locale";
import { formatDate } from "../../../utils/dates";

const Deworming = ({ id }) => {
  const dewormings = useSelector((state) => state.deworming.data);
  const dispatch = useDispatch();
  useEffect(() => {
    return dispatch(readDewormingsByPatient(id));
  }, [id, dispatch]);
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
                <div style={{ width: "90%" }} className="p-6">
                  <p className="text-xl font-thin">
                    <span className="font-normal">Fecha:</span>{" "}
                    {formatRelative(
                      subDays(new Date(dwm.date), 0),
                      new Date(),
                      {
                        locale: es,
                      }
                    )}
                  </p>
                  <p className="text-xl font-thin mt-3">
                    <span className="font-normal">
                      Tipo de desparacitacion:
                    </span>{" "}
                    {dwm.dewormingType?.type}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div style={{ width: "90%" }} className="p-6">
                  <p className="text-xl font-thin">
                    <span className="font-normal">Fecha:</span> {dwm.date}
                  </p>
                  <p className="text-xl font-thin mt-3">
                    <span className="font-normal">
                      Tipo de desparacitacion:
                    </span>{" "}
                    {dwm.dewormingType?.type}
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
        <p className="text-xl font-thin">No hay desparacitaciones que mostrar... </p>
      )}
    </div>
  );
};

export default Deworming;