import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { readEmployeById } from "../redux/actions/employee";
import { checkRole } from "../utils/auth";
import DogSteps from "../assets/animations/dog-steps.json";
import Lottie from "lottie-react";
//*Lazy router */
const Home = lazy(() => import("../pages/Home"));
const Patient = lazy(() => import("../pages/Patient"));
const Patients = lazy(() => import("../pages/Patients"));
const Quote = lazy(() => import("../pages/Quote"));
const Quotes = lazy(() => import("../pages/Quotes"));
const Service = lazy(() => import("../pages/Service"));
const ClinicalServices = lazy(() => import("../pages/ClinicalServices"));

export default function Routes() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.employee.data);
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    return dispatch(readEmployeById(auth?.user?.userid));
  }, [dispatch, auth]);
  return (
    <Router>
      <Switch>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-screen w-screen">
              <Lottie
                className="w-56"
                animationData={DogSteps}
                loop={true}
                autoPlay={true}
              />
            </div>
          }
        >
          <Route path="/" exact>
            {user?.users && (
              <> {checkRole(user?.users) === 1 ? <Patients /> : <Home />}</>
            )}
          </Route>
          <Route path="/clinical-services" component={ClinicalServices} exact />
          <Route path="/quotes">
            {user?.users && (
              <> {checkRole(user?.users) === 1 ? <Patients /> : <Quotes />}</>
            )}
          </Route>
          <Route path="/quote/:id" exact>
            {user?.users && (
              <> {checkRole(user?.users) === 1 ? <Patients /> : <Quote />}</>
            )}
          </Route>
          <Route path="/service/:id" exact component={Service} />
          <Route path="/patients" exact component={Patients} />
          <Route path="/patient/:id" exact component={Patient} />
        </Suspense>
      </Switch>
    </Router>
  );
}
