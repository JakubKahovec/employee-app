import { RootStateOrAny } from "react-redux";
import { ActionsObservable, StateObservable } from "redux-observable";
import { Subject } from "rxjs";
import { toArray } from "rxjs/operators";
import * as actions from "./EmployeesActions";
import { loadEmployeesEpic, saveEmployeeEpic } from "./EmployeesEpics";
import { employee1 } from "./__fixtures__/TestEmployees";

describe("employees epics", () => {
  it("should generate a success action when load employees api call is successful", async () => {
    const action$ = ActionsObservable.of(actions.loadEmployeesAsync.request());
    const state$ = new StateObservable(new Subject(), {} as RootStateOrAny);
    const epicResult$ = loadEmployeesEpic(action$, state$, {
      api: {
        employees: {
          getEmployees: jest.fn().mockResolvedValueOnce([employee1]),
          addEmployee: jest.fn().mockResolvedValue(employee1),
        },
      },
    });
    const resultValues = await epicResult$.pipe(toArray()).toPromise();
    expect(resultValues).toMatchSnapshot();
  });
  it("should generate a fail action when load employees api call fails", async () => {
    const action$ = ActionsObservable.of(actions.loadEmployeesAsync.request());
    const state$ = new StateObservable(new Subject(), {} as RootStateOrAny);
    const epicResult$ = loadEmployeesEpic(action$, state$, {
      api: {
        employees: {
          getEmployees: jest.fn().mockRejectedValue(new Error("Failed to call api")),
          addEmployee: jest.fn().mockResolvedValue(employee1),
        },
      },
    });
    const resultValues = await epicResult$.pipe(toArray()).toPromise();
    expect(resultValues).toMatchSnapshot();
  });
  it("should generate a success action and a redirect action when save employee api call is successful", async () => {
    const action$ = ActionsObservable.of(actions.saveEmployeeAsync.request(employee1));
    const state$ = new StateObservable(new Subject(), {} as RootStateOrAny);
    const epicResult$ = saveEmployeeEpic(action$, state$, {
      api: {
        employees: {
          getEmployees: jest.fn().mockResolvedValueOnce([employee1]),
          addEmployee: jest.fn().mockResolvedValue(employee1),
        },
      },
    });
    const resultValues = await epicResult$.pipe(toArray()).toPromise();
    expect(resultValues).toMatchSnapshot();
  });
  it("should generate a fail action when save employee api call fails", async () => {
    const action$ = ActionsObservable.of(actions.saveEmployeeAsync.request(employee1));
    const state$ = new StateObservable(new Subject(), {} as RootStateOrAny);
    const epicResult$ = saveEmployeeEpic(action$, state$, {
      api: {
        employees: {
          getEmployees: jest.fn().mockResolvedValueOnce([employee1]),
          addEmployee: jest.fn().mockRejectedValue(new Error("Failed to call api")),
        },
      },
    });
    const resultValues = await epicResult$.pipe(toArray()).toPromise();
    expect(resultValues).toMatchSnapshot();
  });
});
