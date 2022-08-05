import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { putVaccination } from "../../../../services/vaccination";
import { Success } from "../../../Global/Alerts/Success";
import { Error } from "../../../Global/Alerts/Error";
import { useDispatch } from "react-redux";
import { addVaccination } from "../../../../redux/actions/vaccination";

export default function VacinationEditForm({
  vaccinationTypes,
  vaccinationDoses,
  vacc,
  setShowModal,
}) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: vacc,
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
      putVaccination(values)
        .then((res) => {
          Success(res.msg);
          setShowModal(false);
          resetForm();
          dispatch(addVaccination(values, values?.patientsId));
        })
        .catch(() => {
          Error("AH ocurrido un error inesperado");
        });
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col">
          <label className="font-semibold text-xs text-gray-600">
            Tipo de vacuna
          </label>
          <select
            defaultValue={vacc?.vaccinationTypeId}
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
        <div className="flex flex-col mt-4">
          <label className="font-semibold text-xs text-gray-600">Dosis</label>
          <select
            name="vaccinationDoseId"
            defaultValue={vacc?.vaccinationDoseId}
            onChange={formik.handleChange}
            className={
              "border px-2 py-1 shadow-md outline-none rounded font-semibold text-xs text-gray-600 mt-1 " +
              (formik.errors.vaccinationDoseId &&
              formik.touched.vaccinationDoseId
                ? "border-red-400"
                : "border")
            }
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
        <div className="flex flex-col mt-3">
          <label className="font-semibold text-xs text-gray-600">
            Refuerzo
          </label>
          <input
            onChange={formik.handleChange}
            type="date"
            defaultValue={vacc !== "N/A" && vacc?.reinforcement.split("T")[0]}
            name="reinforcement"
            className={
              "border px-2 py-1 shadow-md outline-none rounded font-semibold text-xs text-gray-600 mt-1 " +
              (formik.errors.reinforcement && formik.touched.reinforcement
                ? "border-red-400"
                : "border")
            }
          />
          {formik.errors.reinforcement && formik.touched.reinforcement && (
            <span className="text-red-400">{formik.errors.reinforcement}</span>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 py-2 mt-4 rounded text-white w-full"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}
