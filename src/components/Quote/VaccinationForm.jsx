import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  readVaccinationDoses,
  readVaccinationTypes,
} from "../../redux/actions/vaccination";
import { addNewVaccination } from "../../services/vaccination";
import { Success } from "../Global/Alerts/Success";
import { addVaccination } from "../../redux/actions/vaccination";

export default function VaccinationForm({ id, patientsId }) {
  const dispatch = useDispatch();
  const vaccinationDoses = useSelector((state) => state.vaccinationDose.data);
  const vaccinationTypes = useSelector((state) => state.vaccinationType.data);
  const inputDose = useRef(null);
  const inputType = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    dispatch(readVaccinationDoses());
    dispatch(readVaccinationTypes());
    return;
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      vaccinationDoseId: "",
      vaccinationTypeId: "",
      reinforcement: "N/A",
    },
    validationSchema: yup.object({
      vaccinationDoseId: yup
        .number()
        .required("Debes seleccionar la dosis de la vacuna"),
      vaccinationTypeId: yup
        .number()
        .required("Debes seleccionar el tipo de vacuna"),
      reinforcement: yup.string().required("El refuerzo es requerido"),
    }),
    onSubmit: (values, { resetForm }) => {
      const newValues = {
        ...values,
        date: new Date(),
        patientsId,
        reinforcement:
          values.reinforcement === "N/A"
            ? values.reinforcement
            : `${values.reinforcement}T08:00`,
      };
      addNewVaccination(newValues).then(() => {
        Success("Se agrego la vacunacion");
        dispatch(addVaccination(newValues, patientsId));
        inputDose.current.value = "DEFAULT";
        inputType.current.value = "DEFAULT";
        inputRef.current.value = "";
      });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-2 mt-4">
        <div className="p-6">
          <div className="flex flex-col">
            <label className="font-semibold text-xs text-gray-600">
              Tipo de vacuna
            </label>
            <select
              defaultValue={"DEFAULT"}
              ref={inputType}
              name="vaccinationTypeId"
              onChange={formik.handleChange}
              className={
                "border px-2 py-1 shadow-md rounded outline-none font-semibold text-xs text-gray-600 mt-1 " +
                (formik.errors.vaccinationTypeId &&
                formik.touched.vaccinationTypeId
                  ? "border-red-400"
                  : "border")
              }
            >
              <option
                className="font-semibold text-xs text-gray-600"
                disabled
                value={"DEFAULT"}
              >
                Selecciona el tipo de vacuna
              </option>
              {vaccinationTypes &&
                vaccinationTypes.map((vct) => (
                  <option
                    className="font-semibold text-xs text-gray-600"
                    value={vct.id}
                    key={vct.id}
                  >
                    {vct.type}
                  </option>
                ))}
            </select>
            {formik.errors.vaccinationTypeId &&
              formik.touched.vaccinationTypeId && (
                <span className="text-red-400">
                  {formik.errors.vaccinationTypeId}
                </span>
              )}
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-col">
            <label className="font-semibold text-xs text-gray-600">Dosis</label>
            <select
              ref={inputDose}
              name="vaccinationDoseId"
              onChange={formik.handleChange}
              className={
                "border px-2 py-1 shadow-md outline-none rounded font-semibold text-xs text-gray-600 mt-1 " +
                (formik.errors.vaccinationDoseId &&
                formik.touched.vaccinationDoseId
                  ? "border-red-400"
                  : "border")
              }
              defaultValue={"DEFAULT"}
            >
              <option
                className="font-semibold text-xs text-gray-600"
                disabled
                value={"DEFAULT"}
              >
                Selecciona la dosis de la vacuna
              </option>
              {vaccinationDoses &&
                vaccinationDoses.map((vcd) => (
                  <option
                    className="font-semibold text-xs text-gray-600"
                    value={vcd.id}
                    key={vcd.id}
                  >
                    {vcd.type}
                  </option>
                ))}
            </select>
            {formik.errors.vaccinationDoseId &&
              formik.touched.vaccinationDoseId && (
                <span className="text-red-400">
                  {formik.errors.vaccinationDoseId}
                </span>
              )}
          </div>
        </div>
        <div className="px-6 pb-4">
          <div className="flex flex-col">
            <label className="font-semibold text-xs text-gray-600">
              Refuerzo
            </label>
            <input
              onChange={formik.handleChange}
              type="date"
              name="reinforcement"
              ref={inputRef}
              className={
                "border px-2 py-1 shadow-md outline-none rounded font-semibold text-xs text-gray-600 mt-1 " +
                (formik.errors.reinforcement && formik.touched.reinforcement
                  ? "border-red-400"
                  : "border")
              }
            />
            {formik.errors.reinforcement && formik.touched.reinforcement && (
              <span className="text-red-400">
                {formik.errors.reinforcement}
              </span>
            )}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="text-xl ml-6 px-16 rounded font-thin text-white bg-blue-500"
      >
        Guardar
      </button>
    </form>
  );
}
