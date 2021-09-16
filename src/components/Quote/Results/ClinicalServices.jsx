import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readClinicalServicesByPatient } from "../../../redux/actions/clinicalService";
import List from "../../ClinicalServices/List";

export default function ClinicalServices({ id }) {
  const clinicalServices = useSelector((state) => state.clinicalService.data);
  const dispatch = useDispatch();
  useEffect(() => {
    return dispatch(readClinicalServicesByPatient(id));
  }, [dispatch, id]);
  console.log(clinicalServices);
  return (
    <div>
      <div className="grid grid-cols-4 gap-8 mt-4">
        <List clinicalServices={clinicalServices} />
      </div>
    </div>
  );
}
