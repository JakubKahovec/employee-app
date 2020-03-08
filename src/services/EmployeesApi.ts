import { Employee } from "AppModel";

import { default as wretch } from "wretch";

const baseApi = wretch()
  .url("/api")
  .options({ credentials: "include", mode: "cors" });

export const getEmployees = (): Promise<Employee[]> => {
  return baseApi
    .url("/employees.json")
    .get()
    .json<Employee[]>();
};

export const addEmployee = (employee: Employee): Promise<Employee> => {
  return new Promise((resolve) => {
    /* Emulated saving call */
    setTimeout(() => {
      resolve(employee);
    }, 500);
  });
};
