import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Auth from "./Auth";
import Home from "./Home";

export default function IsAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    return setIsLoading(false);
  }, [isLoading]);
  return (
    <>{auth.isLoggedIn ? <Home /> : <Auth setIsLoading={setIsLoading} />}</>
  );
}
