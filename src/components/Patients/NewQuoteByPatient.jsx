import { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { readQuoteTypes } from "../../redux/actions/quote-type";
import { returnTime } from "../../utils/dates";
import { addNewQuote } from "../../services/quotes";
import { useHistory } from "react-router-dom";
import { Success } from "../Global/Alerts/Success";
import { Error } from "../Global/Alerts/Error";
import { SOCKET_URL } from "../../utils/constant";
import { useMemo } from "react";
import io from "socket.io-client";
import { useCallback } from "react";
import { checkIsDoctor } from "../../services/auth";
import { getToken } from "../../services/token";

export default function NewQuoteByPatient({ patient }) {
  const dispatch = useDispatch();
  const quoteTypes = useSelector((state) => state.quoteType.data);
  const auth = useSelector((state) => state.auth);
  const router = useHistory();

  //********************************************************************socket
  const [online, setOnline] = useState(false);
  const [doctor, setDoctor] = useState();
  const serverURL = SOCKET_URL;
  const socket = useMemo(
    () =>
      io.connect(serverURL, {
        transports: ["websocket"],
      }),
    [serverURL]
  );

  useEffect(() => {
    socket.on("connect", () => setOnline(true));
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => setOnline(false));
  }, [socket]);

  const callSocket = useCallback(
    (id) => {
      socket.emit("new", id);
    },
    [socket]
  );
  //******************************************************************************/

  useEffect(() => {
    const getDoctor = () => {
      checkIsDoctor(auth?.user?.userid, getToken()).then((res) => {
        if (res.doctor) {
          setDoctor(res.doctor);
        }
      });
    };
    return getDoctor();
  }, [auth]);

  useEffect(() => {
    return dispatch(readQuoteTypes());
  }, [dispatch]);
  const formik = useFormik({
    initialValues: { date: "", issue: "", quotesTypeId: 0 },
    validationSchema: yup.object({
      date: yup.date().required("La fecha de la consulta es requerida"),
      issue: yup
        .string()
        .required("Desde escribir la descripcion del problema"),
      quotesTypeId: yup
        .number()
        .min(1, "Debes seleccionar el tipo de consulta")
        .required("Debes seleccionar el tipo  de consulta"),
    }),
    onSubmit: (values) => {
      const newData = {
        ...values,
        date: `${values.date}${returnTime()}`,
        patientsId: patient?.id,
        doctorsId: doctor?.id,
      };
      addNewQuote(newData)
        .then((res) => {
          if (res.quoteId) {
            Success("Se guardo la consulta");
            callSocket(auth?.user?.userid);
            router.push(`/quote/${res.quoteId}`);
          }
        })
        .catch(() => {
          Error("Ah ocurrido un error inexperado!!!");
        });
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col w-96 mt-3">
          <label htmlFor="date" className="text-gray-600 font-semibold text-sm">
            Fecha de la consulta
          </label>
          <input
            name="date"
            onChange={formik.handleChange}
            type="date"
            className={
              "border p-2 text-sm text-gray-500 rounded outline-none hover:border-green-400 " +
              (formik.errors.date && formik.touched.date
                ? "border-red-400"
                : "border-gray-300")
            }
          />

          {formik.errors.date && formik.touched.date && (
            <span className="text-xs text-red-400">{formik.errors.date}</span>
          )}
        </div>
        <div className="flex flex-col w-96 mt-3">
          <label htmlFor="date" className="text-gray-600 font-semibold text-sm">
            Problema a tratar
          </label>
          <textarea
            name="issue"
            onChange={formik.handleChange}
            cols={4}
            rows={7}
            className={
              "border p-1 text-sm text-gray-500 rounded outline-none hover:border-green-400 " +
              (formik.errors.issue && formik.touched.issue
                ? "border-red-400"
                : "border-gray-300")
            }
            placeholder="Escribe la descripcion del problema"
          />
          {formik.errors.issue && formik.touched.issue && (
            <span className="text-xs text-red-400">{formik.errors.issue}</span>
          )}
        </div>
        <div className="flex flex-col mt-2">
          <label className="text-gray-600 font-semibold text-sm">
            Tipo de consulta
          </label>
          <select
            defaultValue={"DEFAULT"}
            className={
              "border p-1 text-sm text-gray-500 rounded outline-none hover:border-green-400 " +
              (formik.errors.quotesTypeId && formik.touched.quotesTypeId
                ? "border-red-400"
                : "border-gray-300")
            }
            onChange={formik.handleChange}
            name="quotesTypeId"
          >
            <option value={"DEFAULT"}>Selecciona el tipo de consulta</option>
            {quoteTypes &&
              quoteTypes.length &&
              quoteTypes.map((qtype) => (
                <option key={qtype.id} value={qtype.id}>
                  {qtype.type}
                </option>
              ))}
          </select>
          {formik.errors.quotesTypeId && formik.touched.quotesTypeId && (
            <span className="text-xs text-red-400">
              {formik.errors.quotesTypeId}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 font-semibold py-2 rounded mt-3 text-white"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}
