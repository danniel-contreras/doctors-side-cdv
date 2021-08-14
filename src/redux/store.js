import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { doctorReducer } from "./reducers/doctor.reducer";
import { authReducer } from "./reducers/auth.reducer";
import { quotesReducer } from "./reducers/quotes.reducer";
import { quoteReducer } from "./reducers/quote.reducer";
import { patientReducer } from "./reducers/patients.reducer";

const reducers = combineReducers({
  auth: authReducer,
  doctor: doctorReducer,
  quotes:quotesReducer,
  patient:patientReducer,
  qt:quoteReducer
});

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
