import { faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readPestControlByPatient } from "../../../redux/actions/pest-control";

export default function PestControl({ id }) {
  const pestControls = useSelector((state) => state.pestControl.data);
  const dispatch = useDispatch();
  useEffect(() => {
    return dispatch(readPestControlByPatient(id));
  }, [id, dispatch]);
  return (
    <div className="grid grid-cols-1 w-full">
      {pestControls?.pestControl ? (
        pestControls?.pestControl.map((pest, index) => (
          <div key={pest.id} className=" shadow-md flex border rounded-lg my-3">
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
                    <span className="font-normal">Duracion:</span>{" "}
                    {pest.duration}
                  </p>
                  <p className="text-xl font-thin mt-3">
                    <span className="font-normal">
                      Tipo de control de plagas:
                    </span>{" "}
                    {pest.pestControlType?.type}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div style={{ width: "90%" }} className="p-6">
                  <p className="text-xl font-thin">
                    <span className="font-normal">Fecha:</span> {pest.duration}
                  </p>
                  <p className="text-xl font-thin mt-3">
                    <span className="font-normal">
                      Tipo de desparacitacion:
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
          </div>
        ))
      ) : (
        <p className="text-xl font-thin">
          No hay control de plagas que mostrar...{" "}
        </p>
      )}
    </div>
  );
}
