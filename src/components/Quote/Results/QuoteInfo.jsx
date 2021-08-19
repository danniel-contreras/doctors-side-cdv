import { useState, useRef, useCallback, useEffect } from "react";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Result from "./Result";

export default function QuoteInfo({ index, quote }) {
  const [showResult, setShowResult] = useState(false);
  const ref = useRef(null);
  const escapeListener = useCallback((e) => {
    if (e.key === "Escape") {
      setShowResult(false);
    }
  }, []);
  const clickListener = useCallback(
    (e) => {
      if (!ref.current?.contains(e.target)) {
        setShowResult(false); // using optional chaining here, change to onClose && onClose(), if required
      }
    },
    [ref.current]
  );
  useEffect(() => {
    // Attach the listeners on component mount.
    document.addEventListener("click", clickListener);
    document.addEventListener("keyup", escapeListener);
    // Detach the listeners on component unmount.
    return () => {
      document.removeEventListener("click", clickListener);
      document.removeEventListener("keyup", escapeListener);
    };
  }, []);
  return (
    <div ref={ref} className="flex">
      {index % 2 === 0 || index === 0 ? (
        <>
          <div
            style={{ width: "10%" }}
            className="bg-blue-500 rounded-tl-lg rounded-bl-lg flex justify-center items-center "
          >
            <FontAwesomeIcon
              onClick={() => setShowResult(!showResult)}
              icon={showResult ? faChevronUp : faChevronDown}
              className="text-xl text-white cursor-pointer"
            />
          </div>
          <div style={{ width: "90%" }} className="p-6">
            <p className="text-xl font-thin">
              <span className="font-normal">Fecha:</span> {quote.date}
            </p>
            <p className="text-xl mt-3 font-thin">
              <span className="font-normal">Problema:</span> {quote.issue}
            </p>
            {showResult && <Result id={quote.id} />}
          </div>
        </>
      ) : (
        <>
          <div style={{ width: "90%" }} className="p-6">
            <p className="text-xl font-thin">
              <span className="font-normal">Fecha:</span> {quote.date}
            </p>
            <p className="text-xl mt-3 font-thin">
              <span className="font-normal">Problema:</span> {quote.issue}
            </p>
            {showResult && (
              <div className="border-t mt-2">

                <p className="text-2xl font-normal mt-4">Resultados</p>
                <Result id={quote.id} />
              </div>
            )}
          </div>
          <div
            style={{ width: "10%" }}
            className="bg-blue-500 w-28 rounded-tr-lg rounded-br-lg flex justify-center items-center "
          >
            <FontAwesomeIcon
              onClick={() => setShowResult(!showResult)}
              icon={showResult ? faChevronUp : faChevronDown}
              className="text-xl text-white cursor-pointer"
            />
          </div>
        </>
      )}
    </div>
  );
}
