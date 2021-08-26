import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readPestControlByPatient } from "../../../redux/actions/pest-control";

export default function PestControl({ id }) {
  const pestControls = useSelector((state) => state.pestControl.data);
  const dispatch = useDispatch();
  useEffect(() => {
    return dispatch(readPestControlByPatient(id));
  }, [id, dispatch]);
  return (
    <div className="grid grid-cols-1 w-full">
      {pestControls?.pestControl ?
        pestControls?.pestControl.map((pest) => (
          <div>duracion: {pest.duration}</div>
        )):<p className="text-xl font-thin">No hay control de plagas que mostrar... </p>}
    </div>
  );
}
