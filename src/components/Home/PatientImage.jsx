import { memo } from "react";
import ShowImage from "../Patients/ShowImage"

function PatientImage({ name }) {
  return (
    <div className="w-20 shadow rounded  p-3">
      <ShowImage name={name} />
    </div>
  );
}

export default memo(PatientImage);
