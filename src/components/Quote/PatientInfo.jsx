import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { readPatientById } from "../../redux/actions/patients";

export default function PatientInfo({ id }) {
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.pt.data);
  useEffect(() => {
    return dispatch(readPatientById(id));
  }, [id, dispatch]);
  return (
    <>
      <p className="text-xl text-gray-800 font-normal mt-3">
        Nombre del paciente:{" "}
        <span className="text-xl font-thin">{patient?.patients?.names}</span>
      </p>
      <p className="font-thin text-gray-800 mt-3 text-xl">
        <span className="font-normal text-gray-700">Dueño de la mascota:</span>{" "}
        {patient?.patients?.customers?.names}{" "}
        {patient?.patients?.customers?.lastname}
      </p>
    </>
  );
}
