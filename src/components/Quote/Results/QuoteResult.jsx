import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readQuotesByPatient } from "../../../redux/actions/quotes";
import Pagination from "../../Global/Pagination";
import QuoteInfo from "./QuoteInfo";

export default function QuoteResult({ id }) {
  const dispatch = useDispatch();
  const quotes = useSelector((state) => state.quotes.data);
  const [page, setPage] = useState(1);
  useEffect(() => {
    return dispatch(readQuotesByPatient(id, page));
  }, [id, dispatch, page]);

  const completed = quotes?.quotes && quotes?.quotes?.filter((qt) => !qt.state);
  return (
    <>
      <div className="grid grid-cols-1 gap-4 w-full mt-6">
        {completed && completed.length ? (
          completed.map((quote, index) => (
            <div key={quote.id} className=" shadow-md border rounded-lg">
              <QuoteInfo index={index} quote={quote} />
            </div>
          ))
        ) : (
          <p className="text-xs font-semibold text-gray-600">
            No hay consultas que mostrar...{" "}
          </p>
        )}
      </div>
      <Pagination data={quotes} method={setPage} />
    </>
  );
}
