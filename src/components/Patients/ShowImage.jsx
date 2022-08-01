import { useEffect } from "react";
import { useState } from "react";
import { showImage } from "../../services/patients";

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
  return <img src={imgUrl} className={cssClass} alt="null"></img>;
}
