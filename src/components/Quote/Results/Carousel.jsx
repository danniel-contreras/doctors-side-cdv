import React from "react";
import ShowResultImage from "./ShowResultImage";

export default function Carousel({ photos, page = 1, setpage }) {
    console.log(photos)
  const onNext = () => {
    if (page < photos?.totalPhotos) {
      setpage(page + 1)
    }
  };

  const onPrev = () => {
    if (page > 1) {
        setpage(page - 1)
    }
  };
  return (
    <div className="flex flex-col">
      {photos?.photos?.length &&
        photos?.photos?.map((photo) => (
          <ShowResultImage
            cssClass="slider-item"
            key={photo?.id}
            name={photo?.img}
          />
        ))}
      <div className="grid grid-cols-2 gap-10 mt-4">
        <button
          onClick={onPrev}
          className="bg-blue-500 text-white font-semibold text-sm rounded py-1"
        >
          Anterior
        </button>
        <button
          onClick={onNext}
          className="bg-blue-500 text-white font-semibold text-sm rounded py-1"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
