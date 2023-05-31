import { useEffect, createRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { newLoggout } from "../redux/actions/auth";
import { createPopper } from "@popperjs/core";
import { Link, useHistory } from "react-router-dom";
import { readEmployeById } from "../redux/actions/employee";
import { checkRole } from "../utils/auth";

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const router = useHistory();
  const handleLoggout = () => {
    router.replace("/");
    dispatch(newLoggout());
  };
  const auth = useSelector((state) => state.auth);
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = createRef();
  const popoverDropdownRef = createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const user = useSelector((state) => state.employee.data);
  useEffect(() => {
    return dispatch(readEmployeById(auth?.user?.userid));
  }, [dispatch, auth]);
  return (
    <div className="w-screen h-screen bg-gray-400">
      <div className=" bg-white h-full flex flex-col rounded shadow">
        <div
          className="w-full h-12 p-2 rounded-t bg-teal-500"
        >
          <span className="text-white text-base ml-4 font-bold">
            Clinica de Diagnostico Veterinario
          </span>
          <div className="float-right">
            {checkRole(user?.users) !== 1 && (
              <Link to="/">
                <span className="text-white hover:opacity-75 text-sm cursor-pointer font-medium mr-8">
                  Inicio
                </span>
              </Link>
            )}
            <Link to="/patients">
              <span className="text-white hover:opacity-75 text-sm cursor-pointer font-medium mr-8">
                Pacientes
              </span>
            </Link>
            {checkRole(user?.users) !== 1 && (
              <Link to="/quotes">
                <span className="text-white hover:opacity-75 text-sm cursor-pointer font-medium mr-8">
                  Consultas
                </span>
              </Link>
            )}
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
        <div className="p-10 bg-gray-100 w-full h-full overflow-y-scroll">
          {children}
        </div>
      </div>
    </div>
  );
}
