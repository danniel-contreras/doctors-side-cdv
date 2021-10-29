import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../layout/Layout";
import { readPatientById } from "../redux/actions/patients";
import { showImage, showPDF } from "../services/patients";
import Info from "../components/Quote/Info";
import BreadCrums from "../components/Patients/BreadCrums";
import SinglePage from "../components/Quote/Results/pdf/Single";

export default function Patient() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.pt.data);
  useEffect(() => {
    return dispatch(readPatientById(id));
  }, [id, dispatch]);
  console.log(patient);
  return (
    <Layout>
      <div className="mx-8">
        <div className="grid grid-cols-2 mt-4">
          <div>
            <span className="text-lg font-thin">
              Nombre del paciente:{" "}
              <span className="text-lg">{patient?.patients?.names}</span>
            </span>
            <div className="shadow border w-36 mt-4">
              <img
                className=" p-2"
                src={showImage(patient?.patients?.img)}
                alt="null"
              />
            </div>
            <div>
              <Info id={patient?.patients?.id} />
              <p className="font-thin text-gray-700  mt-3 text-lg">
                <span className="font-normal">Raza:</span>{" "}
                {patient?.patients?.breeds?.type}
              </p>
              <p className="font-thin text-gray-700  mt-3 text-lg">
                <span className="font-normal">Tipo de paciente:</span>{" "}
                {patient?.patients?.patientstype?.type}
              </p>
              <p className="font-thin text-gray-700  mt-3 text-lg">
                <span className="font-normal">Sexo:</span>{" "}
                {patient?.patients?.sexes?.type}
              </p>
              <p className="font-thin text-gray-700  mt-3 text-lg">
                <span className="font-normal">Color:</span>{" "}
                {patient?.patients?.colors?.type}
              </p>
            </div>
          </div>
          <div>
            {patient?.patients?.expPdf === "expediente.pdf" ? (
              ""
            ) : (
              <SinglePage pdf={showPDF(patient?.patients?.expPdf)} />
            )}
          </div>
        </div>
        <BreadCrums id={patient?.patients?.id} />
      </div>
    </Layout>
  );
}
