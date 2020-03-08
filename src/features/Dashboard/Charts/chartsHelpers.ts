import { Employee } from "AppModel";

export const groupByKeyAndMap = (employees: Employee[], key: keyof Employee) => {
  const grouped = employees.reduce((acc, curr) => {
    acc[curr[key]] = acc[curr[key]] || 0;
    acc[curr[key]] = acc[curr[key]] + 1;
    return acc;
  }, {} as Record<string, number>);
  return Object.entries(grouped).map(([name, count]) => ({ name, count }));
};

export const chartColors = ["#0088fe", "#00C49F", "#ffbb28", "#ff8042", "#AADD30"];
