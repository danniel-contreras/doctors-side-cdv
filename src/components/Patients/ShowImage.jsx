import { useEffect } from "react";
import { useState } from "react";
import { showImage } from "../../services/patients";
import ImageLoader from "../Global/ImageLoader";

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
    <ImageLoader width={100} height={100} url={imgUrl} cssClass={cssClass} />
  );
}
