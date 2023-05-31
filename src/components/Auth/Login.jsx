import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { checkIsAdmin, checkIsDoctor, login } from "../../services/auth";
import { Error } from "../../components/Global/Alerts/Error";
import { Success } from "../../components/Global/Alerts/Success";
import { useDispatch } from "react-redux";
import { newLogin } from "../../redux/actions/auth";
import { decodeToken } from "../../services/token";
import { checkRole } from "../../utils/auth";

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
      login(values)
        .then((res) => {
          if (!res.token) {
            Error("Correo o contraseña incorrecta");
            return;
          }
          const token = res.token;
          const user = decodeToken(token);
          checkIsAdmin(user?.userid, token).then((res) => {

            if (checkRole(res?.users) === 1) {
              console.log("Admin:", res)
              dispatch(newLogin(token));
              Success("Los datos son correctos bienvenido!!");
              setIsLoading(true);
              return;
            }
          });
          checkIsDoctor(user?.userid, res.token).then((res) => {
            if (res.doctor) {
              dispatch(newLogin(token));
              Success("Los datos son correctos bienvenido!!");
              setIsLoading(true);
            }
            return;
          }).catch(()=>{
            Error("No eres un doctor autorizado");
          })
        })
        .catch(() => {
          Error("Ah ocurrido un error inerperado");
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col mt-8">
        <label className="text-sm pb-1 font-medium text-gray-500">Email</label>
        <input
          name="email"
          onChange={formik.handleChange}
          type="text"
          placeholder="Escribe tu email"
          className={
            "border-0 text-sm rounded-xl p-4 w-full bg-blue-100 outline-none "
          }
        />
        {formik.errors.email && (
          <span className="text-xs text-red-500">{formik.errors.email}</span>
        )}
      </div>
      <div className="flex flex-col mt-8">
        <label className="text-sm pb-1 font-medium text-gray-500">Contraseña</label>
        <input
          name="password"
          onChange={formik.handleChange}
          type="password"
          placeholder="Escribe tu contraseña"
          className={
            "border-0 text-sm rounded-xl p-4 w-full bg-blue-100 outline-none "
          }
        />
        {formik.errors.password && (
          <span className="text-xs text-red-500">{formik.errors.password}</span>
        )}
      </div>
      <button
        type="submit"
        className="w-full py-4 mt-4 text-sm font-semibold text-white rounded-xl bg-teal-500"
      >
        Iniciar Sesion
      </button>
    </form>
  );
};

export default Login;
