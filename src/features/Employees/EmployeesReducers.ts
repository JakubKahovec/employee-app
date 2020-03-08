import { Employee } from "AppModel";
import { combineReducers } from "redux";
import { createReducer } from "typesafe-actions";
import { loadEmployeesAsync, saveEmployeeAsync } from "./EmployeesActions";

const isSavingEmployees = createReducer(false as boolean)
  .handleAction([saveEmployeeAsync.request], () => true)
  .handleAction([saveEmployeeAsync.success, saveEmployeeAsync.failure], () => false);

const isLoadingEmployees = createReducer(false as boolean)
  .handleAction([loadEmployeesAsync.request], () => true)
  .handleAction([loadEmployeesAsync.success, loadEmployeesAsync.failure], () => false);

const employees = createReducer({ allEmployees: [] as Employee[], newEmployees: [] as Employee[] })
  .handleAction(loadEmployeesAsync.success, (state, action) => ({
    ...state,
    allEmployees: [...action.payload, ...state.newEmployees],
  }))
  .handleAction(saveEmployeeAsync.success, (state, action) => ({
    ...state,
    newEmployees: [...state.newEmployees, action.payload],
  }));

const saveEmployeeError = createReducer("")
  .handleAction(saveEmployeeAsync.failure, (state, action) => action.payload)
  .handleAction(saveEmployeeAsync.success, () => "");

const loadEmployeesError = createReducer("")
  .handleAction(loadEmployeesAsync.failure, (state, action) => action.payload)
  .handleAction(loadEmployeesAsync.success, () => "");

const employeesReducer = combineReducers({
  employees,
  isSavingEmployees,
  isLoadingEmployees,
  saveEmployeeError,
  loadEmployeesError,
});

export default employeesReducer;
export type EmployeesState = ReturnType<typeof employeesReducer>;
