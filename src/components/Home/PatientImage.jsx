import { memo } from "react";
import { showImage } from "../../services/patients";

function PatientImage({ name }) {
  return (
    <div className="w-20 shadow rounded  p-3">
      <img src={showImage(name && name)} alt="null" />
    </div>
  );
}

export default memo(PatientImage);
