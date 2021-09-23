import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import File from "../../../assets/file.png";
import { addPhotoToResult } from "../../../services/results";
import { Warning } from "../../Global/Alerts/Warning";
import { Success } from "../../Global/Alerts/Success";

export default function AddImage({ id, setreload, setShowModal }) {
  const [petImage, setPetimage] = useState(File);
  const [petFile, setPetFile] = useState();
  const onDropImage = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setPetimage(URL.createObjectURL(file));
    setPetFile(file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { getRootProps: getRootImgProps, getInputProps: getInputImgProps } =
    useDropzone({
      accept: "image/jpeg, image/png",
      noKeyboard: true,
      multiple: false,
      onDrop: onDropImage,
    });
  const handleAddImage = () => {
    if (!petFile) {
      Warning("Debes elegir una imagen");
      return;
    }
    addPhotoToResult(petFile, id).then((res) => {
      setreload(true);
      setShowModal(false);
      Success("Se agrego la imagen con exito");
    });
  };
  return (
    <>
      <div
        {...getRootImgProps()}
        className="flex justify-center shadow rounded p-4 items-center mt-4"
      >
        <img src={petImage} className="rounded max-w-96 max-h-96" alt="null" />
      </div>
      <label className="w-full text-xs py-1 mt-3 p-1 flex items-center bg-white rounded-lg tracking-wide  border cursor-pointer">
        <FontAwesomeIcon className="text-gray-600 ml-2" icon={faFolder} />
        <span className="text-gray-500 leading-normal ml-4 ">
          Seleccionar una imagen
        </span>
        <input {...getInputImgProps()} type="file" className="hidden" />
      </label>
      <button
        onClick={handleAddImage}
        className="px-12 mt-5 text-white bg-blue-500 py-1 rounded"
      >
        Guardar
      </button>
    </>
  );
}
