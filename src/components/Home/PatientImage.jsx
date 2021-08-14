import { showImage } from "../../services/patients";

export default function PatientImage({ name }) {
  return (
    <div className="w-44 shadow rounded  p-3">
      <img src={showImage(name && name)} alt="null" />
    </div>
  );
}
