import React, { useState, useRef } from "react";
import { useIntersection } from "../../hooks/useObserver";
import classnames from "classnames";
import "./ImageLoader.css";

const ImageLoader = ({ url, thumb, width, height,cssClass }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();
  useIntersection(imgRef, () => {
    setIsInView(true);
  });

  const handleOnLoad = () => {
    setIsLoaded(true);
  };
  return (
    <div
      className="image-container"
      ref={imgRef}
      style={{
        paddingBottom: `${(height / width) * 100}%`,
        width: "100%",
      }}
    >
      {isInView && (
        <>
          <img
            className={classnames("image", "thumb", {
              ["isLoaded"]: !!isLoaded,
            }) }
            src={thumb}
          />
          <img
            className={classnames("image", {
              ["isLoaded"]: !!isLoaded,
            })}
            src={url}
            onLoad={handleOnLoad}
            alt="null"
          />
        </>
      )}
    </div>
  );
};

export default ImageLoader;
