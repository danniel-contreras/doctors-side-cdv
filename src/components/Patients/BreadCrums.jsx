import { useState, useEffect } from "react";
import Deworming from "../Quote/Results/Deworming";
import PestControl from "../Quote/Results/PestControl";
import QuoteResult from "../Quote/Results/QuoteResult";
import Vaccinations from "../Quote/Results/Vaccinations";
import { useSelector, useDispatch } from "react-redux";
import {
  readVaccinationDoses,
  readVaccinationTypes,
} from "../../redux/actions/vaccination";
import { readPestControlTypes } from "../../redux/actions/pest-control";
import { readDewormingsTypes } from "../../redux/actions/deworming";

export default function BreadCrums({ id }) {
  //** Redux */
  const dispatch = useDispatch();
  const dewormingTypes = useSelector((state) => state.dewormingType.data);
  const pestControlTypes = useSelector((state) => state.pestControlType.data);
  const vaccinationDoses = useSelector((state) => state.vaccinationDose.data);
  const vaccinationTypes = useSelector((state) => state.vaccinationType.data);

  useEffect(() => {
    dispatch(readVaccinationDoses());
    dispatch(readVaccinationTypes());
    dispatch(readPestControlTypes());
    dispatch(readDewormingsTypes());
    return;
  }, [dispatch]);

  /** */
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
                "text-blue-500 text-normal " +
                (showCG ? "font-semibold" : "font-normal")
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
                "text-blue-500 text-normal " +
                (showVac ? "font-semibold" : "font-normal")
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
                "text-blue-500 text-normal " +
                (showDesp ? "font-semibold" : "font-normal")
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
                "text-blue-500 text-normal " +
                (showCP ? "font-semibold" : "font-normal")
              }
            >
              Control de ectoparasitos
            </span>
          </li>
        </ol>
      </nav>
      {showCG && (
        <div>
          <p className="text-normal font-semibold text-gray-600 mt-12">
            Listado de consultas del paciente
          </p>
          <QuoteResult id={id} />
        </div>
      )}
      {showVac && (
        <div>
          <p className="text-normal font-semibold text-gray-600 mt-12">
            Listado de vacunaciones del paciente
          </p>
          <Vaccinations
            vaccinationTypes={vaccinationTypes}
            vaccinationDoses={vaccinationDoses}
            id={id}
          />
        </div>
      )}
      {showCP && (
        <div>
          <p className="text-normal font-semibold text-gray-600 mt-12">
            Listado de controles de ectoparasitos del paciente
          </p>
          <PestControl pestControlTypes={pestControlTypes} id={id} />
        </div>
      )}
      {showDesp && (
        <div>
          <p className="text-normal font-semibold text-gray-600 mt-12">
            Listado de desparacitaciones del paciente
          </p>
          <Deworming dewormingTypes={dewormingTypes} id={id} />
        </div>
      )}
    </div>
  );
}
