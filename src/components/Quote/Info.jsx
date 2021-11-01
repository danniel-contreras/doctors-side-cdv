import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { readPatientById } from "../../redux/actions/patients";

export default function Info({ id }) {
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.pt.data);
  useEffect(() => {
    return dispatch(readPatientById(id));
  }, [id, dispatch]);
  return (
    <div className="flex flex-col">
      {patient && (
        <>
          <span className="font-normal text-gray-600  mt-3 text-sm">
            <span className="font-semibold text-base">Edad:</span>{" "}
            {patient?.patients?.age}
          </span>
          <span className="font-normal text-gray-600  mt-3 text-sm">
            <span className="font-semibold text-base">
              Dueño de la mascota:
            </span>{" "}
            {patient?.patients?.customers?.names}{" "}
            {patient?.patients?.customers?.lastname}
          </span>
        </>
      )}
    </div>
  );
}
