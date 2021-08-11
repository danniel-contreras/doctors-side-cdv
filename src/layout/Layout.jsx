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
      <div className=" bg-white h-full flex flex-col rounded">
        <div
          style={{ background: "rgba(62,196,182,1)" }}
          className="w-full h-12 p-2 rounded-t flex flex-row items-center"
        >
          <span className="text-white text-base ml-4 font-bold">
            Clinica Diagnostica Veterinaria
          </span>
          <span
            onClick={handleLoggout}
            className="text-white text-base float-right font-bold ml-64"
          >
            Cerrar Sesion
          </span>
        </div>
        <div className="p-10 w-full h-full overflow-y-scroll">{children}</div>
      </div>
    </div>
  );
}
