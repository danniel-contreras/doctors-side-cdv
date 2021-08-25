import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { addNewResult, editQuote } from "../../services/results";
import { Success } from "../Global/Alerts/Success";
import { useHistory } from "react-router-dom";

export default function Form({ id, quote }) {
  const router = useHistory();
  const formik = useFormik({
    initialValues: { symptomatology: "", diagnosis: "", treatment: "" },
    validationSchema: yup.object({
      symptomatology: yup.string().required("Debes escribir la sintomatologia"),
      diagnosis: yup.string().required("Debes escribir el diagnostico"),
      treatment: yup.string().required("Desde escribir el tratamiento"),
    }),
    onSubmit: (values) => {
      const newValues = { ...values, date: Date.now(), quoteId: id };
      addNewResult(newValues).then(() => {
        editQuote(id, quote).then(() => {
          Success("Se completo la consulta");
          router.push("/");
        });
      });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-2 mt-4">
        <div className="p-6">
          <div className="flex flex-col">
            <label className="font-thin text-xl text-gray-500">
              Sintomatologia
            </label>
            <textarea
              cols={3}
              rows={4}
              name="symptomatology"
              onChange={formik.handleChange}
              className={
                "border text-gray-500 rounded mt-1 outline-none px-2 py-1 " +
                (formik.errors.symptomatology && formik.touched.symptomatology
                  ? "border-red-400"
                  : "border")
              }
            />
            {formik.errors.symptomatology && formik.touched.symptomatology && (
              <span className="text-red-400">
                {formik.errors.symptomatology}
              </span>
            )}
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-col">
            <label className="font-thin text-xl text-gray-500">
              Diagnostico
            </label>
            <textarea
              cols={3}
              rows={4}
              name="diagnosis"
              onChange={formik.handleChange}
              className={
                "border text-gray-500 rounded mt-1 outline-none px-2 py-1 " +
                (formik.errors.diagnosis && formik.touched.diagnosis
                  ? "border-red-400"
                  : "border")
              }
            />
            {formik.errors.diagnosis && formik.touched.diagnosis && (
              <span className="text-red-400">{formik.errors.diagnosis}</span>
            )}
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-col">
            <label className="font-thin text-xl text-gray-500">
              Tratamiento
            </label>
            <textarea
              cols={3}
              rows={4}
              name="treatment"
              onChange={formik.handleChange}
              className={
                "border text-gray-500 rounded mt-1 outline-none px-2 py-1 " +
                (formik.errors.treatment && formik.touched.treatment
                  ? "border-red-400"
                  : "border")
              }
            />
            {formik.errors.treatment && formik.touched.treatment && (
              <span className="text-red-400">{formik.errors.treatment}</span>
            )}
          </div>
        </div>
      </div>
      <button className="text-xl ml-6 px-16 rounded font-thin text-white bg-blue-500">
        Guardar
      </button>
    </form>
  );
}
