import { Suspense, useEffect,lazy } from "react";
import { useState } from "react";
import { showImage } from "../../services/patients";
const ImageLoader = lazy(() => import("../Global/ImageLoader"));

export default function ShowImage({ name, cssClass }) {
  const [imgUrl, setImgUrl] = useState("");

  const getUrl = (name) => {
    showImage(name).then(({ data }) => {
      setImgUrl(data);
    });
  };

  useEffect(() => {
    return getUrl(name);
  }, [name]);
  return (
    <Suspense fallback={<p>cargando</p>}>
      <ImageLoader url={imgUrl} classname={cssClass} />
    </Suspense>
  );
}
