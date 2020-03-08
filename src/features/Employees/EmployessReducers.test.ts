import { Employee } from "AppModel";
import * as actions from "./EmployeesActions";
import reducer, { EmployeesState } from "./EmployeesReducers";
import { employee1, employee2, employee3 } from "./__fixtures__/TestEmployees";

describe("employees reducer", () => {
  it("should handle SAVE_EMPLOYEES", () => {
    expect(reducer({} as EmployeesState, actions.saveEmployeeAsync.request(employee1))).toEqual(
      expect.objectContaining({
        isSavingEmployees: true,
      }),
    );
    expect(reducer({} as EmployeesState, actions.saveEmployeeAsync.success(employee1))).toEqual(
      expect.objectContaining({
        employees: {
          newEmployees: [employee1],
          allEmployees: [],
        },
        saveEmployeeError: "",
        isSavingEmployees: false,
      }),
    );
    expect(
      reducer(
        { employees: { allEmployees: [employee1], newEmployees: [] as Employee[] } } as EmployeesState,
        actions.saveEmployeeAsync.success(employee2),
      ).employees,
    ).toEqual({
      allEmployees: [employee1],
      newEmployees: [employee2],
    });
    expect(reducer({} as EmployeesState, actions.saveEmployeeAsync.failure("Failed to save"))).toEqual(
      expect.objectContaining({
        employees: {
          newEmployees: [],
          allEmployees: [],
        },
        saveEmployeeError: "Failed to save",
        isSavingEmployees: false,
      }),
    );
  });

  it("should handle LOAD_EMPLOYEES", () => {
    expect(reducer({} as EmployeesState, actions.loadEmployeesAsync.request())).toEqual(
      expect.objectContaining({
        isLoadingEmployees: true,
      }),
    );
    expect(reducer({} as EmployeesState, actions.loadEmployeesAsync.success([employee1]))).toEqual(
      expect.objectContaining({
        employees: {
          newEmployees: [],
          allEmployees: [employee1],
        },
        isLoadingEmployees: false,
      }),
    );
    expect(
      reducer(
        { employees: { allEmployees: [employee1], newEmployees: [employee2] as Employee[] } } as EmployeesState,
        actions.loadEmployeesAsync.success([employee3]),
      ).employees,
    ).toEqual({
      allEmployees: [employee3, employee2],
      newEmployees: [employee2],
    });
    expect(reducer({} as EmployeesState, actions.loadEmployeesAsync.failure("Failed to load"))).toEqual(
      expect.objectContaining({
        employees: {
          newEmployees: [],
          allEmployees: [],
        },
        loadEmployeesError: "Failed to load",
        isLoadingEmployees: false,
      }),
    );
  });
});
