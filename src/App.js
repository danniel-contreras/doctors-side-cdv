import "./App.css";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import {useState,useEffect} from "react"
import {useDispatch,useSelector}from "react-redux"
import IsAuth from "./pages/IsAuth";

function App() {
  return (
    <Provider store={store}>
      <IsAuth />
      <Toaster position="top-right" />
    </Provider>
  );
}

export default App;
