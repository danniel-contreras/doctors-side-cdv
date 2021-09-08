import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "../components/Quotes/List";
import Layout from "../layout/Layout";
import SearchInput from "../components/Global/SearchInput";
import { readDoctorById } from "../redux/actions/doctors";
import { readQuotesByInterval } from "../redux/actions/quotes";
import { filterDates, getEspecificDate, intervalDates } from "../utils/dates";
import { Warning } from "../components/Global/Alerts/Warning";
import Pagination from "../components/Global/Pagination";
import InputSearch from "../components/Global/SearchInput";

export default function Quotes() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const quotes = useSelector((state) => state.quotes.data);
  const [dates, setDates] = useState({ initial: "", final: "" });
  const [consult, setConsult] = useState("");
  const [page, setPage] = useState(1);
  const [quotesState, setQuotesState] = useState();
  useEffect(() => {
    return dispatch(readDoctorById(auth.user?.userid));
  }, [dispatch, auth]);

  const doctors = useSelector((state) => state.doctor.data);

  useEffect(() => {
    const readQuotes = () => {
      if (doctors) {
        dispatch(readQuotesByInterval(doctors.doctor?.id, "", page));
      }
    };
    return readQuotes();
  }, [doctors, dispatch, page]);

  const handleChange = (option) => {
    const quotesA = filterDates(quotes.quotes, option);
    setQuotesState(quotesA);
    if (Number(option) === 5) {
      setQuotesState(quotes?.quotes);
    }
  };
  const handleFilter = () => {
    if (dates.initial === "") {
      Warning("Selecciona la fecha inicial ");
      return;
    }
    if (dates.final === "") {
      Warning("Selecciona la fecha final ");
      return;
    }
    setQuotesState(intervalDates(dates.initial, dates.final, quotes?.quotes));
  };
  const especificDate = (date) => {
    console.log(new Date(date))
    setQuotesState(getEspecificDate(date, quotes?.quotes));
  };
  return (
    <Layout>
      <div className="px-6 flex flex-col">
        <div className="">
          <div className="grid grid-cols-2 gap-5">
            <p className="text-3xl font-thin">Listado consultas</p>
            <div className="flex">
              <label className="font-thin whitespace-nowrap text-xl">
                Filtrar por fecha especifica
              </label>
              <input
                onChange={(e) => especificDate(e.currentTarget.value)}
                className="border bg-white shadow ml-2 px-2 w-full rounded font-thin text-gray-700"
                type="date"
              />
            </div>
          </div>
          <div className="flex mt-4">
            <div className="flex">
              <div className="flex">
                <label className="font-thin whitespace-nowrap text-xl">
                  Fecha inicial
                </label>
                <input
                  onChange={(e) =>
                    setDates({ ...dates, initial: e.currentTarget.value })
                  }
                  className="border bg-white shadow ml-2 px-1 rounded font-thin text-gray-700"
                  type="date"
                />
              </div>
              <div className="pl-4 flex">
                <label className="font-thin whitespace-nowrap text-xl">
                  Fecha final
                </label>
                <input
                  onChange={(e) =>
                    setDates({ ...dates, final: e.currentTarget.value })
                  }
                  className="border bg-white shadow ml-2 px-1 rounded font-thin text-gray-700"
                  type="date"
                />
              </div>
              <button
                onClick={handleFilter}
                className="bg-green-500 px-4 ml-3 rounded text-white "
              >
                Filtrar
              </button>
            </div>
            <label className="font-thin text-xl ml-4">Rangos</label>
            <select
              onChange={(e) => handleChange(e.currentTarget.value)}
              className="border bg-white shadow outline-none font-thin py-1 ml-4  w-full pr-16 float-right"
              defaultValue={"DEFAULT"}
            >
              <option value={"DEFAULT"} disabled>
                Selecciona una opcion para filtrar
              </option>
              <option value={1}>Consultas del dia</option>
              <option value={2}>Consultas entre 5 dias</option>
              <option value={3}>Consultas entre una semana</option>
              <option value={4}>Consultas entre un mes</option>
              <option value={5}>Todas las consultas</option>
            </select>
          </div>
        </div>
        <div className="mt-10">
          <List quotes={quotesState ? quotesState : quotes?.quotes} />
        </div>
        {!quotesState && <Pagination method={setPage} data={quotes} />}
      </div>
    </Layout>
  );
}
