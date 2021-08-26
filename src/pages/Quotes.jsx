import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "../components/Quotes/List";
import Layout from "../layout/Layout";

import { readDoctorById } from "../redux/actions/doctors";
import { readQuotesByDoctor } from "../redux/actions/quotes";
import { filterDates } from "../utils/dates";

export default function Quotes() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const quotes = useSelector((state) => state.quotes.data);
  const [quotesState, setQuotesState] = useState();
  useEffect(() => {
    return dispatch(readDoctorById(auth.user?.userid));
  }, [dispatch, auth]);

  const doctors = useSelector((state) => state.doctor.data);

  useEffect(() => {
    const readQuotes = () => {
      if (doctors) {
        dispatch(readQuotesByDoctor(doctors.doctor?.id));
      }
    };
    return readQuotes();
  }, [doctors, dispatch]);
  const handleChange = (option) => {
    const quotesA = filterDates(quotes.quotes, option);
    setQuotesState(quotesA);
    if(Number(option) === 4){
      setQuotesState(quotes?.quotes)
    }
  };
  return (
    <Layout>
      <div className="p-6 flex flex-col">
        <div className="">
          <p className="text-3xl font-thin">Listado consultas</p>
          <select
            onChange={(e) => handleChange(e.currentTarget.value)}
            className="border outline-none font-thin text-lg  px-2 pr-16 py-1 float-right"
            defaultValue={"DEFAULT"}
          >
            <option value={"DEFAULT"} disabled>
              Selecciona una opcion para filtrar
            </option>
            <option value={1}>Consultas entre 5 dias</option>
            <option value={2}>Consultas entre una semana</option>
            <option value={3}>Consultas entre un mes</option>
            <option value={4}>Todas las consultas</option>
          </select>
        </div>
        <div className="mt-10">
        <List quotes={quotesState ? quotesState : quotes?.quotes} />
        </div>
      </div>
    </Layout>
  );
}
