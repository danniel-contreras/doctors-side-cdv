import React, { useEffect } from "react";
import { showPDF } from "../../services/patients";
import SinglePage from "./Results/pdf/Single";
import { useSelector, useDispatch } from "react-redux";
import { readPatientById } from "../../redux/actions/patients";

export default function PatientExp({ id }) {
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.pt.data);
  useEffect(() => {
    return dispatch(readPatientById(id));
  }, [id, dispatch]);
  return (
    <>
      {patient?.patients?.expPdf === "expediente.pdf" ? (
        ""
      ) : (
        <SinglePage pdf={showPDF(patient?.patients?.expPdf)} />
      )}
    </>
  );
}
