import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

function InfoAlert({ t, toast, content }) {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-white border-l-4 border-blue-500 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <FontAwesomeIcon
              className="text-blue-500 text-xl"
              icon={faInfoCircle}
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">Aviso!!</p>
            <p className="mt-1 text-sm text-gray-500">{content}</p>
          </div>
        </div>
      </div>
      <div className="flex">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex text-sm font-medium text-gray-700"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </div>
  );
}
export const Info = (content) => {
  return toast.custom((t) => {
    <InfoAlert content={content} t={t} />;
  });
};
