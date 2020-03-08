import { routerActions } from "connected-react-router";
import * as employeesActions from "../features/Employees/EmployeesActions";

export default {
  employees: employeesActions,
  router: routerActions,
};
