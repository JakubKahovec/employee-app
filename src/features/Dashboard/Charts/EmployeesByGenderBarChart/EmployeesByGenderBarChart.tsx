import { Employee } from "AppModel";
import * as React from "react";
import { Bar, BarChart, CartesianGrid, Cell, Tooltip, XAxis, YAxis } from "recharts";
import { chartColors, groupByKeyAndMap } from "../chartsHelpers";
import "./EmployeesByGenderBarChart.css";

interface EmployeeByGenderBarChartProps {
  employees: Employee[];
}

export const EmployeeByGenderBarChart = (props: EmployeeByGenderBarChartProps) => {
  const preparedData = groupByKeyAndMap(props.employees, "gender");
  return (
    <div className="EmployeesByJobTitle">
      <h3>Employees by gender</h3>
      <BarChart width={500} height={400} data={preparedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" isAnimationActive={false}>
          {preparedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};
