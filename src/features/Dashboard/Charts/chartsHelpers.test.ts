import { employee1, employee2, employee3, employee4 } from "../../Employees/__fixtures__/TestEmployees";
import { groupByKeyAndMap } from "./chartsHelpers";

it("correctly group and map employees by job title", () => {
  expect(groupByKeyAndMap([employee1, employee2, employee3, employee4], "jobTitle")).toEqual([
    { count: 1, name: "CEO" },
    { count: 1, name: "CTO" },
    { count: 2, name: "CFO" },
  ]);
});

it("correctly group and map employees by gender", () => {
  expect(groupByKeyAndMap([employee1, employee2, employee3, employee4], "gender")).toEqual([
    { count: 2, name: "Male" },
    { count: 2, name: "Female" },
  ]);
});
