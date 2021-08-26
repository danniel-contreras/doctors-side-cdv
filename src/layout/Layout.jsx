import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { newLoggout } from "../redux/actions/auth";
import { createPopper } from "@popperjs/core";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const handleLoggout = () => {
    dispatch(newLoggout());
  };
  const auth = useSelector((state) => state.auth);
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
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
            <Link to="/">
              <span className="text-white hover:opacity-75 text-sm cursor-pointer font-medium mr-8">
                Inicio
              </span>
            </Link>
            <Link to="/patients">
              <span className="text-white hover:opacity-75 text-sm cursor-pointer font-medium mr-8">
               Pacientes
              </span>
            </Link>
            <Link to="/quotes">
              <span className="text-white hover:opacity-75 text-sm cursor-pointer font-medium mr-8">
                Consultas
              </span>
            </Link>
            <Link to="/clinical-services">
              <span className="text-white hover:opacity-75 text-sm cursor-pointer font-medium mr-8">
                Servicios clinicos
              </span>
            </Link>
            <span
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
              className="text-white hover:opacity-75 text-sm cursor-pointer font-medium mr-8"
            >
              Mi cuenta
            </span>
            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? "block " : "hidden ") +
                "text-base z-50 absolute bg-white flex flex-col float-left py-3 list-none text-left rounded shadow-lg mt-8"
              }
              style={{ minWidth: "12rem" }}
            >
              <span className="text-gray-600 px-4 mt-2 text-sm cursor-pointer font-medium mr-8">
                {auth && auth.user?.email}
              </span>
              <span
                onClick={handleLoggout}
                className="text-gray-600 px-4 mt-4 text-sm cursor-pointer font-medium mr-8"
              >
                Cerrar Sesion
              </span>
            </div>
          </div>
        </div>
        <div className="p-10 w-full h-full overflow-y-scroll">{children}</div>
      </div>
    </div>
  );
}
