import { useEffect } from "react";
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

  useEffect(() => {
    dispatch(readVaccinationDoses());
    dispatch(readVaccinationTypes());
    return;
  }, [dispatch]);

  const formik = useFormik({
    initialValues: { vaccinationDoseId: "", vaccinationTypeId: "" },
    validationSchema: yup.object({
      vaccinationDoseId: yup
        .number()
        .required("Debes seleccionar la dosis de la vacuna"),
      vaccinationTypeId: yup
        .number()
        .required("Debes seleccionar el tipo de vacuna"),
    }),
    onSubmit: (values) => {
      const newValues = { ...values, date: Date.now(), patientsId };
      addNewVaccination(newValues).then(() => {
        Success("Se agrego la vacunacion");
        dispatch(addVaccination(newValues,patientsId));
      });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-2 mt-4">
        <div className="p-6">
          <div className="flex flex-col">
            <label className="font-thin text-xl text-gray-500">
              Tipo de vacuna
            </label>
            <select
              defaultValue={"DEFAULT"}
              name="vaccinationTypeId"
              onChange={formik.handleChange}
              className={
                "border px-2 py-1 rounded outline-none text-gray-500 mt-1 " +
                (formik.errors.vaccinationTypeId &&
                formik.touched.vaccinationTypeId
                  ? "border-red-400"
                  : "border")
              }
            >
              <option disabled value={"DEFAULT"}>
                Selecciona el tipo de vacuna
              </option>
              {vaccinationTypes &&
                vaccinationTypes.map((vct) => (
                  <option value={vct.id} key={vct.id}>
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
            <label className="font-thin text-xl text-gray-500">Dosis</label>
            <select
              name="vaccinationDoseId"
              onChange={formik.handleChange}
              className={
                "border px-2 py-1 outline-none rounded text-gray-500 mt-1 " +
                (formik.errors.vaccinationDoseId &&
                formik.touched.vaccinationDoseId
                  ? "border-red-400"
                  : "border")
              }
              defaultValue={"DEFAULT"}
            >
              <option disabled value={"DEFAULT"}>
                Selecciona la dosis de la vacuna
              </option>
              {vaccinationDoses &&
                vaccinationDoses.map((vcd) => (
                  <option value={vcd.id} key={vcd.id}>
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
      </div>
      <button type="submit" className="text-xl ml-6 px-16 rounded font-thin text-white bg-blue-500">
        Guardar
      </button>
    </form>
  );
}
