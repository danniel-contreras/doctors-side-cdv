import React, { useEffect, useState } from "react";
import { showPDF } from "../../services/patients";
import SinglePage from "./Results/pdf/Single";
import { useSelector, useDispatch } from "react-redux";
import { readPatientById } from "../../redux/actions/patients";

export default function PatientExp({ id }) {
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.pt.data);
  const [url, setUrl] = useState();
  useEffect(() => {
    return dispatch(readPatientById(id));
  }, [id, dispatch]);
  useEffect(() => {
    const getUrl = () => {
      if (patient?.patients?.expPdf !== "expediente.pdf") {
        showPDF(patient?.patients?.expPdf).then(({ data }) => {
          setUrl(data);
        });
      }
    };
    return getUrl();
  }, [patient]);
  return <SinglePage pdf={url} />;
}
