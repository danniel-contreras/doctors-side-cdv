import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { login } from "../../services/auth";
import { Error } from "../../components/Global/Alerts/Error";
import { Success } from "../../components/Global/Alerts/Success";
import { useDispatch } from "react-redux";
import { newLogin } from "../../redux/actions/auth";

const Login = ({ setIsLoading }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Email invalido")
        .required("El email es requerido"),
      password: yup.string().required("La password es requerida"),
    }),
    onSubmit: (values) => {
      login(values).then((res) => {
        if (!res.token) {
          Error("Correo o contraseña incorrecta");
          return;
        }
        dispatch(newLogin(res.token));
        Success("Los datos son correctos bienvenido!!");
        setIsLoading(true);
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col mt-8">
        <label className="text-gray-500 text-xs font-medium">Email</label>
        <input
          name="email"
          onChange={formik.handleChange}
          type="text"
          placeholder="Escribe tu email"
          className={
            "border-0 text-xs py-1 mt-2 border-b-2 w-full outline-none " +
            (formik.errors.email ? "border-red-500" : "border-b-2")
          }
        />
        {formik.errors.email && (
          <span className="text-xs text-red-500">{formik.errors.email}</span>
        )}
      </div>
      <div className="flex flex-col mt-8">
        <label className="text-gray-500 text-xs font-medium">Password</label>
        <input
          name="password"
          onChange={formik.handleChange}
          type="password"
          placeholder="Escribe tu password"
          className={
            "border-0 text-xs py-1 mt-2 border-b-2 w-full outline-none " +
            (formik.errors.password ? "border-red-500" : "border-b-2")
          }
        />
        {formik.errors.password && (
          <span className="text-xs text-red-500">{formik.errors.password}</span>
        )}
      </div>
      <button
        type="submit"
        className="text-white w-full rounded text-xs py-2 mt-4"
        style={{ background: "rgba(62,196,182,1)" }}
      >
        Iniciar Sesion
      </button>
    </form>
  );
};

export default Login;
