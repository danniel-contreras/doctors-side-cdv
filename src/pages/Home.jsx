import { useEffect } from "react";
import Layout from "../layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { readDoctorById } from "../redux/actions/doctors";
import { readQuotesByDoctor } from "../redux/actions/quotes";
import io from "socket.io-client";

export default function Home() {
  //redux logic
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const quotes = useSelector((state) => state.quote.data);

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
    socket.on("connect", () => {});
    return () => {
      socket.on("disconnect", () => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("reload", () => {
      if (doctors) {
        dispatch(readQuotesByDoctor(doctors.doctors?.id));
      }
    });
  }, [doctors, dispatch, socket]);
  
  return (
    <Layout>
      <div className="home mx-10">
        <p className="mb-4 text-2xl font-thin">Citas pendientes</p>
        <div className="grid grid-cols-3 gap-20 mt-4">
          {quotes?.quotes &&
            quotes.quotes.map((quote) => (
              <div className="bg-white shadow flex flex-col rounded w-full h-96 p-6">
                <div className="rounded-full w-32 h-32 bg-green-300"></div>
                <span className="text-xl font-light mt-8">
                  {quote.patients?.names}
                </span>
                <span className="text-base font-light mt-8">
                  05/08/2021 - 2:30 P.M
                </span>
                <button className="bg-blue-600 text-white rounded text-xs py-2 w-full mt-6">
                  Revisar
                </button>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
}
