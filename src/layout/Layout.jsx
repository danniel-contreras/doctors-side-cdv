import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { newLoggout } from "../redux/actions/auth";

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const handleLoggout = () => {
    dispatch(newLoggout());
  };
  return (
    <div className="w-screen h-screen bg-gray-100 p-8">
      <div className=" bg-white h-full flex flex-col rounded shadow">
        <div
          style={{ background: "rgba(62,196,182,1)" }}
          className="w-full h-12 p-2 rounded-t"
        >
          <span className="text-white text-base ml-4 font-bold">
            Clinica de Diagnostico Veterinario
          </span>
          <div className="float-right">
            <span className="text-white text-sm cursor-pointer font-medium mr-8">
              Mis consultas
            </span>
            <span className="text-white text-sm cursor-pointer font-medium mr-8">
              Mis pacientes
            </span>
            <span className="text-white text-sm cursor-pointer font-medium mr-8">
              Mi cuenta
            </span>
            <span
              onClick={handleLoggout}
              className="text-white text-sm cursor-pointer font-medium mr-8"
            >
              Cerrar Sesion
            </span>
          </div>
        </div>
        <div className="p-10 w-full h-full overflow-y-scroll">{children}</div>
      </div>
    </div>
  );
}
