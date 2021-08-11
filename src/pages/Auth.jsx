import React from "react";
import backSVG from "../assets/back.svg";
import Well from "../assets/wellcome.svg"
import Login from "../components/Auth/Login";

export default function Auth({setIsLoading}) {
  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center content-center">
      <div
        style={{
          backgroundImage: `url("${backSVG}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          boxShadow: "0px 34px 107px -6px rgba(62,196,182,0.82)",
          borderRadius: "2rem",
        }}
        className="w-10/12 h-5/6 p-10 flex justify-center items-center content-center"
      >
        <div
          style={{ borderRadius: "2rem" }}
          className="bg-white w-80 h-full p-10"
        >
          <div>
            <p className="text-base grid grid-cols-1 font-bold text-blue-800">
              <span>
                Clinica
                <span style={{ color: "rgba(62,196,182,1)" }}> Diagnostica</span>
              </span>
              <span>Veterinaria</span>
            </p>
            <div className="mt-6">
               <div className="flex w-full justify-center">
                    <img src={Well} className="w-36" alt="null"/>
               </div>
               <Login setIsLoading={setIsLoading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
