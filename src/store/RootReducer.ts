import { connectRouter } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import employeesReducer from "../features/Employees/EmployeesReducers";

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    employees: employeesReducer,
  });

export default createRootReducer;
