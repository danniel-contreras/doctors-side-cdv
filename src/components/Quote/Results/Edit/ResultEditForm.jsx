import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { readResultsByQuote } from "../../../../redux/actions/result";
import { putResult } from "../../../../services/results";
import { Error } from "../../../Global/Alerts/Error";
import { Success } from "../../../Global/Alerts/Success";

export default function ResultEditForm({ res, setShowModal }) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: res,
    validationSchema: yup.object({
      symptomatology: yup.string().required("Debes escribir la sintomatologia"),
      diagnosis: yup.string().required("Debes escribir el diagnostico"),
      treatment: yup.string().required("Desde escribir el tratamiento"),
    }),
    onSubmit: (values) => {
      const newValues = {
        ...values,
        nexQuote:
          values.nexQuote !== "0"
            ? `${values.nexQuote}T08:00`
            : values.nexQuote,
      };
      putResult(newValues)
        .then(() => {
          Success("Se actualizo el resultado");
          dispatch(readResultsByQuote(res.quoteId));
          setShowModal(false);
        })
        .catch(() => {
          Error("Ah ocurrido un error inesperado");
        });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 mt-4 w-96">
        <div>
          <div className="flex flex-col">
            <label className="font-semibold text-xs text-gray-600">
              Sintomatologia
            </label>
            <textarea
              cols={3}
              rows={4}
              name="symptomatology"
              defaultValue={res?.symptomatology}
              onChange={formik.handleChange}
              placeholder="Escribe el sintomatologia para el paciente"
              className={
                "border shadow-md rounded mt-1 font-semibold text-xs text-gray-600 outline-none px-2 py-1 " +
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
        <div className="mt-3">
          <div className="flex flex-col">
            <label className="font-semibold text-xs text-gray-600">
              Diagnostico
            </label>
            <textarea
              cols={3}
              rows={4}
              name="diagnosis"
              defaultValue={res?.diagnosis}
              onChange={formik.handleChange}
              placeholder="Escribe el diagnostico para el paciente"
              className={
                "border font-semibold text-xs text-gray-600shadow-md rounded mt-1 outline-none px-2 py-1 " +
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
        <div className="mt-3">
          <div className="flex flex-col">
            <label className="font-semibold text-xs text-gray-600">
              Tratamiento
            </label>
            <textarea
              placeholder="Escribe el tratamiento para el paciente"
              cols={3}
              rows={4}
              name="treatment"
              defaultValue={res?.treatment}
              onChange={formik.handleChange}
              className={
                "border font-semibold text-xs text-gray-600 shadow-md rounded mt-1 outline-none px-2 py-1 " +
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
        <div className="mt-2">
          <div className="flex flex-col">
            <label className="font-semibold text-xs text-gray-600">
              Proxima consulta
            </label>
            <input
              type="date"
              name="nexQuote"
              onChange={formik.handleChange}
              defaultValue={
                res.nexQuote !== "N/A" && res?.nexQuote.split("T")[0]
              }
              className={
                "border font-semibold text-xs text-gray-600 shadow-md rounded mt-1 outline-none px-2 py-1 " +
                (formik.errors.nexQuote && formik.touched.nexQuote
                  ? "border-red-400"
                  : "border")
              }
            />
            {formik.errors.nexQuote && formik.touched.nexQuote && (
              <span className="text-red-400">{formik.errors.nexQuote}</span>
            )}
          </div>
        </div>
      </div>
      <button className="text-sm w-full py-2 mt-3 rounded font-semibold text-white bg-blue-500">
        Guardar
      </button>
    </form>
  );
}
