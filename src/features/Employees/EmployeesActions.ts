import { Employee } from "AppModel";
import { createAsyncAction } from "typesafe-actions";

export const saveEmployeeAsync = createAsyncAction(
  "employees/SAVE_EMPLOYEES_REQUEST",
  "employees/SAVE_EMPLOYEES_SUCCESS",
  "employees/SAVE_EMPLOYEES_FAILURE",
)<Employee, Employee, string>();

export const loadEmployeesAsync = createAsyncAction(
  "employees/LOAD_EMPLOYEES_REQUEST",
  "employees/LOAD_EMPLOYEES_SUCCESS",
  "employees/LOAD_EMPLOYEES_FAILURE",
)<undefined, Employee[], string>();
