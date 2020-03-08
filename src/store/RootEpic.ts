import { combineEpics } from "redux-observable";

import * as dashboardEpics from "../features/Employees/EmployeesEpics";

export default combineEpics(...Object.values(dashboardEpics));
