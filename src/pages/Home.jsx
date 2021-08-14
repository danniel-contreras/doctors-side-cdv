import { useEffect } from "react";
import Layout from "../layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { readDoctorById } from "../redux/actions/doctors";
import { readQuotesByDoctor } from "../redux/actions/quotes";
import io from "socket.io-client";
import QuoteList from "../components/Home/QuoteList";
import CompletedQuotes from "../components/Home/CompletedQuotes";

export default function Home() {
  //redux logic
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const quotes = useSelector((state) => state.quotes.data);

  //socket.io logic
  const serverURL = "http://localhost:8000";
  const socket = io(serverURL, {
    withCredentials: true,
  });
  //react useEffect logic
  useEffect(() => {
    return dispatch(readDoctorById(auth.user?.userid));
  }, [dispatch, auth]);

  const doctors = useSelector((state) => state.doctor.data);

  useEffect(() => {
    const readQuotes = () => {
      if (doctors) {
        dispatch(readQuotesByDoctor(doctors.doctors?.id));
      }
    };
    return readQuotes();
  }, [doctors, dispatch]);

  useEffect(() => {
    socket.on("reload", () => {
      console.log("hola mundo");
      if (doctors) {
        dispatch(readQuotesByDoctor(doctors.doctors?.id));
      }
    });
    return () => {
      socket.off("reload", () => {
        console.log("se desconecta");
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctors]);
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
