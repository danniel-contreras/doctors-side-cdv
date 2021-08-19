import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readResultsByQuote } from "../../../redux/actions/result";

export default function Result({ id }) {
  const dispatch = useDispatch();
  const result = useSelector((state) => state.result.data);
  useEffect(() => {
    return dispatch(readResultsByQuote(id));
  }, [id, dispatch]);
  return (
    <div className="mt-2">
      <p className="font-thin text-xl mt-2"><span className="font-normal">Sintomatologia:</span> {result?.symptomatology}</p>
      <p className="font-thin text-xl mt-2"><span className="font-normal">Diagnostico:</span> {result?.diagnosis}</p>
      <p className="font-thin text-xl mt-2"><span className="font-normal">Tratamiento:</span> {result?.treatment}</p>
    </div>
  );
}
