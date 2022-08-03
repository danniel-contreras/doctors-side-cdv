import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Success } from "../../../Global/Alerts/Success";
import { Error } from "../../../Global/Alerts/Error";
import { useDispatch } from "react-redux";
import { putDeworming } from "../../../../services/deworming";
import { addDeworming } from "../../../../redux/actions/deworming";

export default function DewormingEditForm({
  dwm,
  dewormingTypes,
  setShowModal,
}) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: dwm,
    validationSchema: yup.object({
      dewormingTypeId: yup
        .number()
        .required("Desde seleccionar el tipo de desparacitacion"),
    }),
    onSubmit: (values, { resetForm }) => {
      putDeworming(values)
        .then((res) => {
          Success("Se actualizo correctamente");
          dispatch(addDeworming(values, values.patientsId));
          setShowModal(false);
          resetForm();
        })
        .catch(() => {
          Error("Ah ocurrido un error inesperado!!");
        });
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col">
          <label className="font-semibold text-xs text-gray-600">Dosis</label>
          <select
            onChange={formik.handleChange}
            defaultValue={dwm?.dewormingTypeId}
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
          {formik.errors.dewormingTypeId && formik.touched.dewormingTypeId && (
            <span className="text-red-400">
              {formik.errors.dewormingTypeId}
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
            defaultValue={dwm !== "N/A" && dwm?.reinforcement.split("T")[0]}
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
