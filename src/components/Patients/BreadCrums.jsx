import { useState } from "react";
import Deworming from "../Quote/Results/Deworming";
import PestControl from "../Quote/Results/PestControl";
import QuoteResult from "../Quote/Results/QuoteResult";
import Vaccinations from "../Quote/Results/Vaccinations";

export default function BreadCrums({ id }) {
  const [showCG, setShowCG] = useState(true);
  const [showVac, setShowVac] = useState(false);
  const [showDesp, setShowDesp] = useState(false);
  const [showCP, setShowCP] = useState(false);
  const handleShowCG = () => {
    setShowCG(true);
    setShowVac(false);
    setShowDesp(false);
    setShowCP(false);
  };

  const handleShowVac = () => {
    setShowCG(false);
    setShowVac(true);
    setShowDesp(false);
    setShowCP(false);
  };

  const handleShowDesp = () => {
    setShowCG(false);
    setShowVac(false);
    setShowDesp(true);
    setShowCP(false);
  };

  const handleShowCP = () => {
    setShowCG(false);
    setShowVac(false);
    setShowDesp(false);
    setShowCP(true);
  };
  return (
    <div>
      <nav className="bg-grey-light p-3 rounded font-sans w-full m-4 mt-16">
        <ol className="list-reset flex text-grey-dark">
          <li onClick={handleShowCG} className="cursor-pointer">
            <span
              className={
                "text-blue-500 text-xl " +
                (showCG ? "font-medium" : "font-thin")
              }
            >
              Consulta general
            </span>
          </li>
          <li>
            <span className="mx-4">/</span>
          </li>
          <li onClick={handleShowVac} className="cursor-pointer">
            <span
              className={
                "text-blue-500 text-xl " +
                (showVac ? "font-medium" : "font-thin")
              }
            >
              Vacunacion
            </span>
          </li>
          <li>
            <span className="mx-4">/</span>
          </li>
          <li onClick={handleShowDesp} className="cursor-pointer">
            <span
              className={
                "text-blue-500 text-xl " +
                (showDesp ? "font-medium" : "font-thin")
              }
            >
              Desparacitacion
            </span>
          </li>
          <li>
            <span className="mx-4">/</span>
          </li>
          <li onClick={handleShowCP} className="cursor-pointer">
            <span
              className={
                "text-blue-500 text-xl " +
                (showCP ? "font-medium" : "font-thin")
              }
            >
              Control de plagas
            </span>
          </li>
        </ol>
      </nav>
      {showCG && (
        <div>
          <p className="text-2xl font-thin mt-12">
            Listado de consultas del paciente
          </p>
          <QuoteResult id={id} />
        </div>
      )}
      {showVac && (
        <div>
          <p className="text-2xl font-thin mt-12">
            Listado de vacunaciones del paciente
          </p>
          <Vaccinations id={id} />
        </div>
      )}
       {showCP && (
        <div>
          <p className="text-2xl font-thin mt-12">
            Listado de controles de plagas del paciente
          </p>
          <PestControl id={id} />
        </div>
      )}
       {showDesp && (
        <div>
          <p className="text-2xl font-thin mt-12">
            Listado de desparacitaciones del paciente
          </p>
          <Deworming id={id} />
        </div>
      )}
    </div>
  );
}
