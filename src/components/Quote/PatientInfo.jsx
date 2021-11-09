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
      <p className="text-base text-gray-600 font-semibold mt-3">
        Nombre del paciente:{" "}
        <span className="text-sm font-normal">{patient?.patients?.names}</span>
      </p>
      <p className="text-base text-gray-600 font-semibold mt-3">
        Peso:{" "}
        <span className="text-sm font-normal">{patient?.patients?.weight}</span>
      </p>
    </>
  );
}
