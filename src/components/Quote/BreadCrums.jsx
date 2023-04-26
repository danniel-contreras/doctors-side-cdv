import { useState,useEffect } from "react";
import DewormingForm from "./DewormingForm";
import Form from "./Form";
import PestControlForm from "./PestControlForm";
import Deworming from "./Results/Deworming";
import PestControl from "./Results/PestControl";
import QuoteResult from "./Results/QuoteResult";
import Vaccinations from "./Results/Vaccinations";
import VaccinationForm from "./VaccinationForm";
import { useSelector, useDispatch } from "react-redux";
import {
  readVaccinationDoses,
  readVaccinationTypes,
} from "../../redux/actions/vaccination";
import { readPestControlTypes } from "../../redux/actions/pest-control";
import { readDewormingsTypes } from "../../redux/actions/deworming";

export default function BreadCrums({ id, patientsId, quote, patient }) {

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

  const [showForm, setShowForm] = useState(true);
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
    <>
      <nav className="bg-grey-light p-3 rounded font-sans w-full m-4 mt-16">
        <ol className="list-reset flex text-grey-dark">
          <li onClick={handleShowCG} className="cursor-pointer">
            <span
              className={
                "text-blue-500 text-base " +
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
                "text-blue-500 text-base " +
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
                "text-blue-500 text-base " +
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
                "text-blue-500 text-base " +
                (showCP ? "font-medium" : "font-thin")
              }
            >
              Control de ectoparasitos
            </span>
          </li>
        </ol>
      </nav>
      {showCG && (
        <div>
          {!quote.state && showForm  && (
            <Form setShowForm={setShowForm} patientsId={patientsId} quote={quote} id={id} />
          )}
          <p className="text-normal font-semibold text-gray-600 mt-12">
            Listado de consultas del paciente
          </p>
          <QuoteResult quoteId={id} id={patientsId} />
        </div>
      )}
      {showVac && (
        <div>
          <VaccinationForm id={id} patientsId={patientsId} />
          <p className="text-normal font-semibold text-gray-600 mt-12">
            Listado de vacunaciones del paciente
          </p>
          <Vaccinations vaccinationTypes={vaccinationTypes} vaccinationDoses={vaccinationDoses} id={patientsId} />
        </div>
      )}
      {showCP && (
        <div>
          <PestControlForm patientsId={patientsId} />
          <p className="text-normal font-semibold text-gray-600 mt-12">
            Listado de controles de plagas del paciente
          </p>
          <PestControl pestControlTypes={pestControlTypes} id={patientsId} />
        </div>
      )}
      {showDesp && (
        <div>
          <DewormingForm patientsId={patientsId} />
          <p className="text-normal font-semibold text-gray-600 mt-12">
            Listado de desparacitaciones del paciente
          </p>
          <Deworming dewormingTypes={dewormingTypes} id={patientsId} />
        </div>
      )}
    </>
  );
}
