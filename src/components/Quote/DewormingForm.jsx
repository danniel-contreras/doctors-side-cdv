import { useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import {
  addDeworming,
  readDewormingsTypes,
} from "../../redux/actions/deworming";
import { addNewDeworming } from "../../services/deworming";
import { Success } from "../Global/Alerts/Success";

export default function DewormingForm({ patientsId }) {
  const dewormingTypes = useSelector((state) => state.dewormingType.data);
  const dispatch = useDispatch();
  const inputType = useRef(null);
  const inputRef = useRef(null);
  const formik = useFormik({
    initialValues: { dewormingTypeId: "", reinforcement: "N/A" },
    validationSchema: yup.object({
      dewormingTypeId: yup
        .number()
        .required("Desde seleccionar el tipo de desparacitacion"),
    }),
    onSubmit: (values) => {
      const newValues = {
        ...values,
        date: new Date(),
        patientsId,
        reinforcement:
          values.reinforcement === "N/A"
            ? values.reinforcement
            : `${values.reinforcement}T08:00`,
      };
      addNewDeworming(newValues).then(() => {
        dispatch(addDeworming(newValues, patientsId));
        Success("Se guardo la desparacitacion");
        inputType.current.value = "DEFAULT";
        inputRef.current.value = "";
      });
    },
  });

  useEffect(() => {
    return dispatch(readDewormingsTypes());
  }, [dispatch]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-2 mt-4">
        <div className="p-6">
          <div className="flex flex-col">
            <label className="font-semibold text-xs text-gray-600">Tipo de desparacitacion</label>
            <select
              onChange={formik.handleChange}
              defaultValue={"DEFAULT"}
              ref={inputType}
              name="dewormingTypeId"
              className={
                "border px-2 text-xs font-semibold py-1 outline-none rounded text-gray-500 mt-1 " +
                (formik.errors.dewormingTypeId && formik.touched.dewormingTypeId
                  ? "border-red-400"
                  : "border")
              }
            >
              <option
                className="text-xs font-semibold"
                value={"DEFAULT"}
                disabled
              >
                Selecciona el tipo de desparacitacion
              </option>
              {dewormingTypes &&
                dewormingTypes.map((dwtypes) => (
                  <option value={dwtypes.id} key={dwtypes.id}>
                    {dwtypes.type} - {dwtypes.brand}
                  </option>
                ))}
            </select>
            {formik.errors.dewormingTypeId &&
              formik.touched.dewormingTypeId && (
                <span className="text-red-400">
                  {formik.errors.dewormingTypeId}
                </span>
              )}
          </div>
        </div>
        <div className="p-6">
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
        className="text-sm py-1 ml-6 px-16 rounded font-semibold text-white bg-blue-500"
      >
        Guardar
      </button>
    </form>
  );
}
