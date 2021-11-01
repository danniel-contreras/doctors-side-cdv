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
    <div className="grid grid-cols-1 gap-4 w-full mt-6">
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
              </>
            ) : (
              <>
                <div style={{ width: "90%" }} className="p-6">
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
          </div>
        ))
      ) : (
        <p className="text-xs font-semibold text-gray-600">
          No hay control de plagas que mostrar...{" "}
        </p>
      )}
    </div>
  );
}
