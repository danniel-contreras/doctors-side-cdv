import { useEffect } from "react";
import { useState } from "react";
import { getUrlPhoto } from "../../../services/results";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus,faMinus,faTimes } from "@fortawesome/free-solid-svg-icons";

export default function ShowResultImage({ name, cssClass }) {
  const [imgUrl, setImgUrl] = useState("");

  const getUrl = (name) => {
    getUrlPhoto(name).then(({ data }) => {
      setImgUrl(data);
    });
  };

  useEffect(() => {
    return getUrl(name);
  }, [name]);
  return (
    <TransformWrapper>
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <>
          <div className="flex justify-center">
            <button className="bg-green-500 text-white text-xl px-4 py-1 rounded-md m-4" onClick={() => zoomIn()}>
              <FontAwesomeIcon icon={faPlus}/>
            </button>
            <button className="bg-green-500 text-white text-xl px-4 py-1 rounded-md m-4" onClick={() => zoomOut()}>
            <FontAwesomeIcon icon={faMinus}/>
            </button>
            <button className="bg-red-500 text-white text-xl px-4 py-1 rounded-md m-4 text-center font-semibold" onClick={() => resetTransform()}>
            <FontAwesomeIcon icon={faTimes}/>
            </button>
          </div>
          <TransformComponent>
          <img src={imgUrl} alt="null" />
          </TransformComponent>
        </>
      )}
    </TransformWrapper>
  );
}
