import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ClinicalServices from "../pages/ClinicalServices";
import Home from "../pages/Home";
import Patient from "../pages/Patient";
import Patients from "../pages/Patients";
import Quote from "../pages/Quote";
import Quotes from "../pages/Quotes";
import Service from "../pages/Service";
import { useDispatch, useSelector } from "react-redux";
import { readEmployeById } from "../redux/actions/employee";
import { checkRole } from "../utils/auth";

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
      </Switch>
    </Router>
  );
}
