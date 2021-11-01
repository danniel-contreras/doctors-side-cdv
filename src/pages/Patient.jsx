import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../layout/Layout";
import { readPatientById } from "../redux/actions/patients";
import { showImage, showPDF } from "../services/patients";
import Info from "../components/Quote/Info";
import BreadCrums from "../components/Patients/BreadCrums";
import SinglePage from "../components/Quote/Results/pdf/Single";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

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
        <div className="flex flex-col xl:flex-row mt-4">
          <div className="pr-20 w-full">
            <p className="text-base font-semibold">
              Nombre del paciente:{" "}
              <span className="text-sm font-normal">
                {patient?.patients?.names}
              </span>
            </p>

            <div className="shadow border w-36 mt-4">
              <img
                className=" p-2"
                src={showImage(patient?.patients?.img)}
                alt="null"
              />
            </div>
            <div>
              <Info id={patient?.patients?.id} />
              <p className="font-normal text-gray-600  mt-3 text-sm">
                <span className="font-semibold text-base">Raza:</span>{" "}
                {patient?.patients?.breeds?.type}
              </p>
              <p className="font-normal text-gray-600  mt-3 text-sm">
                <span className="font-semibold text-base">
                  Tipo de paciente:
                </span>{" "}
                {patient?.patients?.patientstype?.type}
              </p>
              <p className="font-normal text-gray-600  mt-3 text-sm">
                <span className="font-semibold text-base">Sexo:</span>{" "}
                {patient?.patients?.sexes?.type}
              </p>
              <p className="font-normal text-gray-600  mt-3 text-sm">
                <span className="font-semibold text-base">Color:</span>{" "}
                {patient?.patients?.colors?.type}
              </p>
            </div>
          </div>
          <div className="flex max-w-full max-h-full flex-col items-center content-center justify-center">
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
