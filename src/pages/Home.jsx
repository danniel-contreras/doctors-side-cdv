import { useEffect, useMemo, useState, useCallback } from "react";
import Layout from "../layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { readDoctorById } from "../redux/actions/doctors";
import { readQuotesByDoctor } from "../redux/actions/quotes";
import io from "socket.io-client";
import QuoteList from "../components/Home/QuoteList";
import CompletedQuotes from "../components/Home/CompletedQuotes";
import { Success } from "../components/Global/Alerts/Success";

export default function Home() {
  //redux logic
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const quotes = useSelector((state) => state.quotes.data);
  const [isReload, setisReload] = useState(false);
  const [online, setOnline] = useState(false);
  //socket.io logic
  const serverURL = "http://137.184.41.16:8000";
  const socket = useMemo(
    () =>
      io.connect(serverURL, {
        transports: ["websocket"],
      }),
    [serverURL]
  );
  //when a new quote is added use a useCallback with socket
  const callSocket = useCallback(() => {
    socket.on("reload", () => {
      Success("Se registro una nueva consulta")
      setisReload(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, dispatch]);
  //socket connect with useEffect
  useEffect(() => {
    socket.on("connect", () => setOnline(true));
  }, [socket]);

  //socket discconect with useEffect
  useEffect(() => {
    socket.on("disconnect", () => setOnline(false));
  }, [socket]);

  //get doctor with the id of current logged user
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

  useEffect(() => {
    return callSocket();
  }, [callSocket]);
  useEffect(() => {
    if (doctors) {
      dispatch(readQuotesByDoctor(doctors.doctor?.id));
    }
    setisReload(false)
    return;
  }, [isReload, dispatch, doctors]);
  console.log(online ? "Conectado" : "Desconectado");
  return (
    <Layout>
      <div className="home mx-10">
        <p className="mb-4 text-2xl font-thin">Citas pendientes</p>
        <div className="grid grid-cols-3 gap-20 mt-4">
          <QuoteList quotes={quotes} />
        </div>
        <p className="mb-4 text-2xl mt-8 font-thin">Citas completadas</p>
        <div className="grid grid-cols-3 gap-20 mt-4">
          <CompletedQuotes quotes={quotes} />
        </div>
      </div>
    </Layout>
  );
}
