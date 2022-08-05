import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { putPestControl } from "../../../../services/pest-control";
import { Success } from "../../../Global/Alerts/Success";
import { Error } from "../../../Global/Alerts/Error";
import { useDispatch } from "react-redux";
import { addPestControl } from "../../../../redux/actions/pest-control";

export default function PestControlEditForm({ pestControlTypes, pest,setShowModal }) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: pest,
    validationSchema: yup.object({
      pestControltypeId: yup.string().required("Debes escribir el diagnostico"),
      duration: yup
        .string()
        .required("Desde escribir la duracion del tratamiento"),
    }),
    onSubmit: (values) => {
      putPestControl(values)
        .then(() => {
          Success("Se actualizo el control de plagas");
          dispatch(addPestControl(values, values.patientsId));
          setShowModal(false)
        })
        .catch(() => {
          Error("Ah ocurrido un error inesperado");
        });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 mt-4">
        <div>
          <div className="flex flex-col">
            <label className="font-semibold text-xs text-gray-600">
              Tipo de control de plagas
            </label>
            <select
              name="pestControlTypeId"
              onChange={formik.handleChange}
              className={
                "border px-2 py-1 outline-none rounded font-semibold text-xs text-gray-600 mt-1 " +
                (formik.errors.pestControltypeId &&
                formik.touched.pestControltypeId
                  ? "border-red-400"
                  : "border")
              }
              defaultValue={pest?.pestControltypeId}
            >
              <option
                className="font-semibold text-xs text-gray-600"
                value={"DEFAULT"}
                disabled
              >
                Selecciona el tipo de control de plagas
              </option>
              {pestControlTypes &&
                pestControlTypes.map((pctypes) => (
                  <option
                    className="font-semibold text-xs text-gray-600"
                    value={pctypes.id}
                    key={pctypes.id}
                  >
                    {pctypes.type}
                  </option>
                ))}
            </select>
            {formik.errors.pestControltypeId &&
              formik.touched.pestControltypeId && (
                <span className="text-red-400">
                  {formik.errors.pestControltypeId}
                </span>
              )}
          </div>
        </div>
        <div className="mt-4">
          <div className="flex flex-col">
            <label className="font-semibold text-xs text-gray-600">
              Duracion
            </label>
            <input
              name="duration"
              onChange={formik.handleChange}
              defaultValue={pest?.duration}
              className={
                "border px-2 py-1 outline-none rounded font-semibold text-xs text-gray-600 mt-1 " +
                (formik.errors.duration && formik.touched.duration
                  ? "border-red-400"
                  : "border")
              }
              placeholder="Escribe la duracion del control de plagas"
            />
            {formik.errors.duration && formik.touched.duration && (
              <span className="text-red-400">{formik.errors.duration}</span>
            )}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="w-full text-sm py-2 mt-4 rounded font-semibold text-white bg-blue-500"
      >
        Guardar
      </button>
    </form>
  );
}
