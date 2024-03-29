import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { doctorReducer } from "./reducers/doctor.reducer";
import { authReducer } from "./reducers/auth.reducer";
import { quotesReducer } from "./reducers/quotes.reducer";
import { quoteReducer } from "./reducers/quote.reducer";
import { patientsReducer } from "./reducers/patients.reducer";
import { patientReducer } from "./reducers/patient.reducer";
import { resultReducer } from "./reducers/result.reducer";
import { vaccinationDoseReducer } from "./reducers/vaccination-dose.reducer";
import { vaccinationTypeReducer } from "./reducers/vaccination-type.reducer";
import { vaccinationReducer } from "./reducers/vaccination.reducer";
import { dewormingReducer } from "./reducers/deworming.reducer";
import { dewormingTypesReducer } from "./reducers/deworming-type.reducer";
import { pestControlTypesReducer } from "./reducers/pest-control-type.reducer";
import { pestControlReducer } from "./reducers/pest-control";
import { clinicalServiceReducer } from "./reducers/clinical-service";
import { serviceReducer } from "./reducers/service.reducer";
import { userReducer } from "./reducers/employee.reducer";
import { quoteTypeReducer } from "./reducers/quote-types.reducer";

const reducers = combineReducers({
  auth: authReducer,
  doctor: doctorReducer,
  quotes: quotesReducer,
  patient: patientsReducer,
  qt: quoteReducer,
  pt: patientReducer,
  result: resultReducer,
  vaccinationDose: vaccinationDoseReducer,
  vaccinationType: vaccinationTypeReducer,
  vaccination: vaccinationReducer,
  deworming: dewormingReducer,
  dewormingType: dewormingTypesReducer,
  pestControlType: pestControlTypesReducer,
  pestControl: pestControlReducer,
  clinicalService: clinicalServiceReducer,
  service: serviceReducer,
  employee: userReducer,
  quoteType: quoteTypeReducer,
});

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
