import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readQuotesByPatient } from "../../../redux/actions/quotes";
import QuoteInfo from "./QuoteInfo";

export default function QuoteResult({ id }) {
  const dispatch = useDispatch();
  const quotes = useSelector((state) => state.quotes.data);
  useEffect(() => {
    return dispatch(readQuotesByPatient(id));
  }, [id, dispatch]);
  
  const completed =
    quotes?.quotes &&
    quotes?.quotes.filter((qt) => !qt.state);
  console.log(completed);
  return (
    <div className="grid grid-cols-1 gap-4 w-full mt-6">
      {completed && completed.length ? (
        completed.map((quote, index) => (
          <div key={quote.id} className=" shadow-md border rounded-lg">
            <QuoteInfo index={index} quote={quote} />
          </div>
        ))
      ) : (
        <p className="text-xl font-thin">No hay consultas que mostrar... </p>
      )}
    </div>
  );
}
