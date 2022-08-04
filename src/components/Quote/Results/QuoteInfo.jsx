import { useState, useRef, useCallback, useEffect } from "react";
import {
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Result from "./Result";
import { formatRelative, subDays } from "date-fns";
import { es } from "date-fns/locale";

export default function QuoteInfo({ index, quote }) {
  const [showResult, setShowResult] = useState(false);
  const ref = useRef(null);
  const escapeListener = useCallback((e) => {
    if (e.key === "Escape") {
      setShowResult(false);
    }
  }, []);
  const clickListener = useCallback((e) => {
    if (!ref.current?.contains(e.target)) {
      setShowResult(false); // using optional chaining here, change to onClose && onClose(), if required
    }
  }, []);
  useEffect(() => {
    // Attach the listeners on component mount.
    document.addEventListener("click", clickListener);
    document.addEventListener("keyup", escapeListener);
    // Detach the listeners on component unmount.
    return () => {
      document.removeEventListener("click", clickListener);
      document.removeEventListener("keyup", escapeListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <p className="text-sm font-normal text-gray-600">
              <span className="font-semibold text-base">Fecha:</span>{" "}
              {formatRelative(subDays(new Date(quote.date), 0), new Date(), {
                locale: es,
              })}
            </p>
            <p className="text-sm font-normal text-gray-600">
              <span className="font-semibold text-base">Problema:</span>{" "}
              {quote.issue}
            </p>
            {showResult && <Result id={quote.id} />}
          </div>
        </>
      ) : (
        <>
          <div style={{ width: "90%" }} className="p-6">
            <p className="text-sm font-normal text-gray-600">
              <span className="font-semibold text-base">Fecha:</span>{" "}
              {formatRelative(subDays(new Date(quote.date), 0), new Date(), {
                locale: es,
              })}
            </p>
            <p className="text-sm font-normal text-gray-600">
              <span className="font-semibold text-base">Problema:</span>{" "}
              {quote.issue}
            </p>
            {showResult && <Result id={quote.id} />}
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
