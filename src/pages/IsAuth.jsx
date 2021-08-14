import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Routes from "../routes/routes";
import Auth from "./Auth";

export default function IsAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    return setIsLoading(false);
  }, [isLoading]);
  return (
    <>{auth.isLoggedIn ? <Routes /> : <Auth setIsLoading={setIsLoading} />}</>
  );
}
