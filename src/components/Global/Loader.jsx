import React from "react";
import Lottie from "lottie-react";
import AnimalCareLoading from "../../assets/animations/animal-care-loading.json";

export default function Loader() {
  return (
    <div className="flex justify-center items-center">
      <Lottie className="w-96" animationData={AnimalCareLoading} loop={true} autoPlay={true} />
    </div>
  );
}
