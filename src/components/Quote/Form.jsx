import { useFormik } from "formik";
import { useMemo, useEffect, useCallback } from "react";
import * as yup from "yup";
import { addNewResult, editQuote } from "../../services/results";
import { Success } from "../Global/Alerts/Success";
import { useDispatch } from "react-redux";
import { readQuotesByPatient } from "../../redux/actions/quotes";
import io from "socket.io-client";
import { SOCKET_URL } from "../../utils/constant";
import { dateFormat, returnTime } from "../../utils/dates";

export default function Form({ id, quote, patientsId, setShowForm }) {
  const dispatch = useDispatch();
  const serverURL = SOCKET_URL;
  const socket = useMemo(
    () =>
      io.connect(serverURL, {
        transports: ["websocket"],
      }),
    [serverURL]
  );
  useEffect(() => {
    socket.on("connect", () => {});
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => {});
  }, [socket]);

  const callSocket = useCallback(
    (data) => {
      socket.emit("newAdmin", data);
    },
    [socket]
  );

  const formik = useFormik({
    initialValues: {
      symptomatology: "N/A",
      diagnosis: "N/A",
      treatment: "N/A",
      nexQuote: "0",
    },
    validationSchema: yup.object({
      symptomatology: yup.string().required("Debes escribir la sintomatologia"),
      diagnosis: yup.string().required("Debes escribir el diagnostico"),
      treatment: yup.string().required("Desde escribir el tratamiento"),
    }),
    onSubmit: (values) => {
      const newValues = {
        ...values,
        date: `${dateFormat()}${returnTime()}`,
        quoteId: id,
        nexQuote:
          values.nexQuote !== "0"
            ? `${values.nexQuote}T08:00`
            : values.nexQuote,
      };
      addNewResult(newValues).then(() => {
        editQuote(id, quote).then(() => {
          callSocket(values.nexQuote);
          Success("Se completo la consulta");
          dispatch(readQuotesByPatient(patientsId));
          setShowForm(false);
          window.location.reload();
        });
      });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-2 mt-4">
        <div className="p-6">
          <div className="flex flex-col">
            <label className="font-semibold text-xs text-gray-600">
              Sintomatologia
            </label>
            <textarea
              cols={3}
              rows={5}
              name="symptomatology"
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
        <div className="p-6">
          <div className="flex flex-col">
            <label className="font-semibold text-xs text-gray-600">
              Diagnostico
            </label>
            <textarea
              cols={3}
              rows={5}
              name="diagnosis"
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
        <div className="p-6">
          <div className="flex flex-col">
            <label className="font-semibold text-xs text-gray-600">
              Tratamiento
            </label>
            <textarea
              placeholder="Escribe el tratamiento para el paciente"
              cols={3}
              rows={5}
              name="treatment"
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
        <div className="p-6">
          <div className="flex flex-col">
            <label className="font-semibold text-xs text-gray-600">
              Proxima consulta
            </label>
            <input
              type="date"
              name="nexQuote"
              onChange={formik.handleChange}
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
      <button className="text-sm ml-6 px-16 py-1 rounded font-semibold text-white bg-blue-500">
        Guardar
      </button>
    </form>
  );
}
