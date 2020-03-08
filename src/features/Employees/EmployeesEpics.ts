import { Epic } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, filter, map, mergeMap, switchMap } from "rxjs/operators";
import { isActionOf, RootAction, RootState, Services } from "typesafe-actions";

import { Employee } from "AppModel";
import { routerActions } from "connected-react-router";
import { routes } from "../../Routes";
import { loadEmployeesAsync, saveEmployeeAsync } from "./EmployeesActions";

export const saveEmployeeEpic: Epic<RootAction, RootAction, RootState, Services> = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(saveEmployeeAsync.request)),
    mergeMap((action) =>
      from(api.employees.addEmployee(action.payload)).pipe(
        mergeMap((employee: Employee) => [saveEmployeeAsync.success(employee), routerActions.push(routes.dashboard)]),
        catchError((err: Error) => of(saveEmployeeAsync.failure(err.message))),
      ),
    ),
  );

export const loadEmployeesEpic: Epic<RootAction, RootAction, RootState, Services> = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(loadEmployeesAsync.request)),
    switchMap(() =>
      from(api.employees.getEmployees()).pipe(
        map(loadEmployeesAsync.success),
        catchError((err: Error) => of(loadEmployeesAsync.failure(err.message))),
      ),
    ),
  );
