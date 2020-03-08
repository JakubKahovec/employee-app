import { Employee } from "AppModel";
import * as React from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { chartColors, groupByKeyAndMap } from "../chartsHelpers";
import "./EmployeesByJobTitlePieChart.css";

interface EmployeeByJobTitlePieChartProps {
  employees: Employee[];
}

export const EmployeeByJobTitlePieChart = (props: EmployeeByJobTitlePieChartProps) => {
  const preparedData = groupByKeyAndMap(props.employees, "jobTitle");
  return (
    <div className="EmployeesByJobTitle">
      <h3>Employees by job title</h3>
      <PieChart width={500} height={500}>
        <Pie
          data={preparedData}
          dataKey="count"
          nameKey="name"
          cx={190}
          cy={190}
          outerRadius={150}
          fill="#8884d8"
          isAnimationActive={false}
          label={(item) => `${item.name} ${item.value}`}
        >
          {preparedData.map((entry, index) => (
            <Cell key={index} fill={chartColors[index % chartColors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};
