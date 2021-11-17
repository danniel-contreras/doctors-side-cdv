import { useEffect, useMemo, useState, useCallback } from "react";
import Layout from "../layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { readDoctorById } from "../redux/actions/doctors";
import { readQuotesByDoctor } from "../redux/actions/quotes";
import io from "socket.io-client";
import QuoteList from "../components/Home/QuoteList";
import CompletedQuotes from "../components/Home/CompletedQuotes";
import { Success } from "../components/Global/Alerts/Success";
import { SOCKET_URL } from "../utils/constant";
import { filterDates } from "../utils/dates";
import Page from "./Page";
import addNotification from "react-push-notification";

export default function Home() {
  //redux logic
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const quotes = useSelector((state) => state.quotes.data);
  const [isReload, setisReload] = useState(false);
  const [online, setOnline] = useState(false);
  const handleNotification = () => {
    addNotification({
      title: "Aviso!!!",
      message: "Una nueva consulta ah sido agregada",
      theme: "light",
      native: true, // when using native, your OS will handle theming.
    });
  };
  //socket.io logic
  const serverURL = SOCKET_URL;
  const socket = useMemo(
    () =>
      io.connect(serverURL, {
        transports: ["websocket"],
      }),
    [serverURL]
  );
  //when a new quote is added use a useCallback with socket
  const doctors = useSelector((state) => state.doctor.data);
  //get doctor with the id of current logged user
  useEffect(() => {
    return dispatch(readDoctorById(auth.user?.userid));
  }, [dispatch, auth]);

  const callSocket = useCallback(() => {
    socket.on("reload", (data) => {
      if(auth.user?.userid === data?.doctorId){
        handleNotification()
        setisReload(true)
      }
      return
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  //socket connect with useEffect
  useEffect(() => {
    socket.on("connect", () => setOnline(true));
  }, [socket]);

  //socket discconect with useEffect
  useEffect(() => {
    socket.on("disconnect", () => setOnline(false));
  }, [socket]);
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
    setisReload(false);
    return;
  }, [isReload, dispatch, doctors, online]);
  return (
    <Layout>
      <div className="home mx-10">
        <p className="mb-4 text-base font-semibold">Citas pendientes</p>
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4">
          <QuoteList quotes={filterDates(quotes?.quotes, 1)} />
        </div>
        <p className="text-base font-semibold my-4">Citas completadas</p>
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4">
          <CompletedQuotes quotes={filterDates(quotes?.quotes, 1)} />
        </div>
      </div>
    </Layout>
  );
}
