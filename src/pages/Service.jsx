import { useEffect, useState, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { readServiceById } from "../redux/actions/service";
import { showImage } from "../services/patients";
import Info from "../components/Quote/Info";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { useDropzone } from "react-dropzone";
import File from "../assets/file.png";
import {
  addPhotoToService,
  putClinicalService,
} from "../services/clinical-services";
import { Warning } from "../components/Global/Alerts/Warning";
import { Success } from "../components/Global/Alerts/Success";
import { readClinicalServices } from "../redux/actions/clinicalService";
import List from "../components/ClinicalServices/Service/List";

export default function Service() {
  const [serviceFile, setServiceFile] = useState();
  const [serviceImage, setServiceImage] = useState(File);
  const { id } = useParams();
  const service = useSelector((state) => state.service.data);
  const clinicalServices = useSelector((state) => state.clinicalService.data);
  const dispatch = useDispatch();

  useEffect(() => {
    return dispatch(readServiceById(id));
  }, [dispatch, id]);

  useEffect(() => {
    return dispatch(readClinicalServices());
  }, [dispatch]);

  const newService = service ? service.clinicalServices : {};

  const onDropImage = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setServiceImage(URL.createObjectURL(file));
    setServiceFile(file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { getRootProps: getRootImgProps, getInputProps: getInputImgProps } =
    useDropzone({
      accept: "image/jpeg, image/png",
      noKeyboard: true,
      multiple: false,
      onDrop: onDropImage,
    });
  const router = useHistory();
  const saveImage = () => {
    if (!serviceFile) {
      putClinicalService(newService, id).then(() => {
        Warning("Se completo sin una imagen");
        router.push("/clinical-services");
        dispatch(readServiceById(id));
        dispatch(readClinicalServices());
      });
      return;
    }
    addPhotoToService(serviceFile, id).then(() => {
      putClinicalService(newService, id).then(() => {
        Warning("Se completo el servicio clinico");
        router.push("/clinical-services");
        dispatch(readServiceById(id));
        dispatch(readClinicalServices());
      });
    });
  };
  return (
    <Layout>
      <div className="px-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-xl text-gray-700 font-thin">
              Nombre del paciente:
              <span className="text-xl">{newService.patients?.names}</span>
            </span>
            <div className="shadow w-80 mt-4">
              <img
                className=" p-4"
                src={showImage(newService.patients?.img)}
                alt="null"
              />
            </div>
            <Info id={newService.patientsId} />
            <p className="font-thin text-gray-700 mt-3 text-xl">
              <span className="font-normal">Observacion:</span>{" "}
              {newService.observations}
            </p>
            <p className="font-thin text-gray-700 mt-3 text-xl">
              <span className="font-normal">Servicio adquirido:</span>{" "}
              {newService.clinicalServicesType?.type}{" "}
            </p>
            {newService.img === "servicios.png" && (
              <button
                onClick={saveImage}
                type="submit"
                className="text-xl w-full mt-6 px-16 rounded font-thin text-white bg-blue-500"
              >
                Completar
              </button>
            )}
          </div>
          <div className="w-full flex flex-col border mt-5 p-5">
            <div className=" max-h-96 h-96 border flex justify-center items-center">
              <div
                {...getRootImgProps()}
                className="w-full flex items-center justify-center p-2"
              >
                <img className="p-4 max-h-96" src={serviceImage} alt="null" />
              </div>
            </div>
            <div>
              <label className="flex flex-col p-2 items-center justify-center bg-white tracking-wide cursor-pointer">
                <FontAwesomeIcon
                  className="text-gray-600 ml-2 text-xl"
                  icon={faFolder}
                />
                <span className="text-gray-500 leading-normal ml-2 ">
                  Buscar foto....
                </span>
                <input type="file" {...getInputImgProps()} className="hidden" />
              </label>
            </div>
          </div>
        </div>
        <div>
          <p className="text-3xl mt-10 font-thin">
            Listado de servicios adquiridos
          </p>
          <List
            patId={newService.patientsId}
            clinicalServices={clinicalServices}
          />
        </div>
      </div>
    </Layout>
  );
}
