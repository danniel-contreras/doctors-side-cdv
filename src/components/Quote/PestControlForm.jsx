import { useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import {
  addPestControl,
  readPestControlTypes,
} from "../../redux/actions/pest-control";
import { addNewPestControl } from "../../services/pest-control";
import { Success } from "../Global/Alerts/Success";

export default function PestControlForm({ patientsId }) {
  const dispatch = useDispatch();
  const inputDuration = useRef(null);
  const inputType = useRef(null);
  const inputRef = useRef(null);
  const pestControlTypes = useSelector((state) => state.pestControlType.data);
  const formik = useFormik({
    initialValues: { pestControlTypeId: "", duration: "" },
    validationSchema: yup.object({
      pestControlTypeId: yup.string().required("Debes escribir el diagnostico"),
      duration: yup
        .string()
        .required("Desde escribir la duracion del tratamiento"),
        reinforcement: yup.string().required("El refuerzo es requerido"),
    }),
    onSubmit: (values) => {
      const newValues = { ...values, date: new Date(),
        patientsId,
        reinforcement:
          values.reinforcement === "N/A"
            ? values.reinforcement
            : `${values.reinforcement}T08:00`, };
      addNewPestControl(newValues).then(() => {
        Success("Se agrego el control de plagas");
        dispatch(addPestControl(newValues, patientsId));
        inputDuration.current.value = "";
        inputType.current.value = "DEFAULT";
      });
    },
  });
  useEffect(() => {
    return dispatch(readPestControlTypes());
  }, [dispatch]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-2 mt-4">
        <div className="p-6">
          <div className="flex flex-col">
            <label className="font-semibold text-xs text-gray-600">
              Tipo de control de plagas
            </label>
            <select
              ref={inputType}
              name="pestControlTypeId"
              onChange={formik.handleChange}
              className={
                "border px-2 py-1 outline-none rounded font-semibold text-xs text-gray-600 mt-1 " +
                (formik.errors.pestControlTypeId &&
                formik.touched.pestControlTypeId
                  ? "border-red-400"
                  : "border")
              }
              defaultValue={"DEFAULT"}
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
            {formik.errors.pestControlTypeId &&
              formik.touched.pestControlTypeId && (
                <span className="text-red-400">
                  {formik.errors.pestControlTypeId}
                </span>
              )}
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-col">
            <label className="font-semibold text-xs text-gray-600">
              Duracion
            </label>
            <input
              name="duration"
              ref={inputDuration}
              onChange={formik.handleChange}
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
