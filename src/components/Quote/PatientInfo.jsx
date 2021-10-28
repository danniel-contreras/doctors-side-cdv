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
      <p className="text-base text-gray-800 font-normal mt-3">
        Nombre del paciente:{" "}
        <span className="text-lg font-thin">{patient?.patients?.names}</span>
      </p>
    </>
  );
}
