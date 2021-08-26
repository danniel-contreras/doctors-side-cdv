import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { readPatientById } from "../../redux/actions/patients";

export default function Info({ id }) {
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.pt.data);
  useEffect(() => {
    return dispatch(readPatientById(id));
  }, [id, dispatch]);
  console.log(patient);
  return (
    <div className="flex flex-col mt-6">
      {patient && (
        <>
          <span className="font-thin text-gray-700  mt-3 text-xl">
            <span className="font-normal">Edad:</span> {patient.patients?.age}
          </span>
          <span className="font-thin text-gray-700 mt-3 text-xl">
            <span className="font-normal text-gray-700">Dueño de la mascota:</span>{" "}
            {patient.patients?.customers?.names}{" "}
            {patient.patients?.customers?.lastname}
          </span>
        </>
      )}
    </div>
  );
}
