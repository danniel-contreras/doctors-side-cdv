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
  const pestControlTypes = useSelector((state) => state.pestControlType.data);
  const formik = useFormik({
    initialValues: { pestControlTypeId: "", duration: "" },
    validationSchema: yup.object({
      pestControlTypeId: yup.string().required("Debes escribir el diagnostico"),
      duration: yup
        .string()
        .required("Desde escribir la duracion del tratamiento"),
    }),
    onSubmit: (values) => {
      const newValues = { ...values, date: new Date(), patientsId };
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
            <label className="font-thin text-xl text-gray-500">
              Tipo de control de plagas
            </label>
            <select
              ref={inputType}
              name="pestControlTypeId"
              onChange={formik.handleChange}
              className={
                "border px-2 py-1 outline-none rounded text-gray-500 mt-1 " +
                (formik.errors.pestControlTypeId &&
                formik.touched.pestControlTypeId
                  ? "border-red-400"
                  : "border")
              }
              defaultValue={"DEFAULT"}
            >
              <option value={"DEFAULT"} disabled>
                Selecciona el tipo de control de plagas
              </option>
              {pestControlTypes &&
                pestControlTypes.map((pctypes) => (
                  <option value={pctypes.id} key={pctypes.id}>
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
            <label className="font-thin text-xl text-gray-500">Duracion</label>
            <input
              name="duration"
              ref={inputDuration}
              onChange={formik.handleChange}
              className={
                "border px-2 py-1 outline-none rounded text-gray-500 mt-1 " +
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
        className="text-xl ml-6 px-16 rounded font-thin text-white bg-blue-500"
      >
        Guardar
      </button>
    </form>
  );
}
