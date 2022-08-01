import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { readQuoteById } from "../redux/actions/quote";
import Info from "../components/Quote/Info";
import BreadCrums from "../components/Quote/BreadCrums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import PatientInfo from "../components/Quote/PatientInfo";
import PatientExp from "../components/Quote/PatientExp";
import ShowImage from "../components/Patients/ShowImage";

const Quote = () => {
  const { id } = useParams();
  const quote = useSelector((state) => state.qt.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readQuoteById(id));
  }, [id, dispatch]);
  const newqt = quote ? quote.quotes : {};
  console.log(quote);
  const router = useHistory();
  const goBack = () => {
    router.goBack();
  };
  console.log(newqt);
  return (
    <Layout>
      <div className="px-8">
        <span
          onClick={goBack}
          className="font-semibold text-gray-600 text-base cursor-pointer"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Atras
        </span>
        <div className="flex flex-col xl:flex-row mt-4">
          <div className="pr-20 w-full">
            <div className="shadow-md border w-36 my-4">
              <ShowImage cssClass="p-4" name={newqt.patients?.img} />
            </div>
            <PatientInfo id={newqt.patientsId} />
            <div>
              <Info id={newqt.patientsId} />
              <p className="font-normal mt-3 text-sm text-gray-600">
                <span className="font-semibold text-base">
                  Detalles de consulta:
                </span>{" "}
                {newqt.issue}
              </p>
            </div>
          </div>
          <div className="flex max-w-full max-h-full flex-col items-center content-center justify-center">
            <PatientExp id={newqt.patientsId} />
          </div>
        </div>
        <BreadCrums
          patient={newqt.patients}
          quote={newqt}
          id={id}
          patientsId={newqt.patients?.id}
        />
      </div>
    </Layout>
  );
};

export default Quote;
