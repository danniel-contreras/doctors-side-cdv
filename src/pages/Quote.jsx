import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { readQuoteById } from "../redux/actions/quote";
import { showImage } from "../services/patients";
import Info from "../components/Quote/Info";
import BreadCrums from "../components/Quote/BreadCrums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Quote = () => {
  const { id } = useParams();
  const quote = useSelector((state) => state.qt.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readQuoteById(id));
  }, [id, dispatch]);
  const newqt = quote ? quote.quotes : {};
  const router = useHistory()
  const goBack = ()=>{
    router.goBack()
  }
  return (
    <Layout>
      <div className="px-8">
        <span onClick={goBack} className="font-thin text-base cursor-pointer"><FontAwesomeIcon icon={faArrowLeft}/> Atras</span>
        <div className="grid grid-cols-2 mt-4">
          <div>
            <span className="text-2xl font-thin">
              Nombre del paciente:{" "}
              <span className="text-xl">{newqt.patients?.names}</span>
            </span>
            <div className="shadow-md border w-80 mt-4">
              <img
                className=" p-4"
                src={showImage(newqt.patients?.img)}
                alt="null"
              />
            </div>
          </div>
          <div>
            <Info id={newqt.patientsId} />
            <p className="font-thin mt-3 text-xl">
              <span className="font-normal">Detalles de consulta:</span>{" "}
              {newqt.issue}
            </p>
          </div>
        </div>
        <BreadCrums patient={newqt.patients} quote={newqt} id={id} patientsId={newqt.patients?.id} />
      </div>
    </Layout>
  );
};

export default Quote;
