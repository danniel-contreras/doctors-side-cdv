import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../layout/Layout";
import { readPatientById } from "../redux/actions/patients";
import { showImage } from "../services/patients";
import Info from "../components/Quote/Info";
import BreadCrums from "../components/Patients/BreadCrums";

export default function Patient() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.pt.data);
  useEffect(() => {
    return dispatch(readPatientById(id));
  }, [id, dispatch]);
  return (
    <Layout>
      <div className="mx-8">
        <div className="grid grid-cols-2 mt-4">
          <div>
            <span className="text-2xl font-thin">
              Nombre del paciente:{" "}
              <span className="text-xl">{patient?.patients?.names}</span>
            </span>
            <div className="shadow w-9/12 mt-4">
              <img
                className=" p-4"
                src={showImage(patient?.patients?.img)}
                alt="null"
              />
            </div>
          </div>
          <div>
            <Info id={patient?.patients?.id} />
            <p className="font-thin text-gray-700  mt-3 text-xl">
              <span className="font-normal">Raza:</span>{" "}
              {patient?.patients?.breeds?.type}
            </p>
            <p className="font-thin text-gray-700  mt-3 text-xl">
              <span className="font-normal">Tipo de paciente:</span>{" "}
              {patient?.patients?.patientstype?.type}
            </p>
            <p className="font-thin text-gray-700  mt-3 text-xl">
              <span className="font-normal">Sexo:</span>{" "}
              {patient?.patients?.sexes?.type}
            </p>
            <p className="font-thin text-gray-700  mt-3 text-xl">
              <span className="font-normal">Color:</span>{" "}
              {patient?.patients?.colors?.type}
            </p>
          </div>
        </div>
        <BreadCrums id={patient?.patients?.id} />
      </div>
    </Layout>
  );
}
