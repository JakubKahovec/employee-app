import { Employee } from "AppModel";
import { Table } from "antd";
import { ColumnProps } from "antd/es/table";
import * as React from "react";
import "./EmployeeList.css";

interface EmployeeListProps {
  employees: Employee[];
  isLoading: boolean;
}

export class EmployeeList extends React.Component<EmployeeListProps> {
  render() {
    const { isLoading, employees } = this.props;
    return (
      <Table<Employee>
        pagination={false}
        scroll={{ y: 400 }}
        className="Employee-list-table-striped-rows"
        loading={isLoading}
        rowKey={(_, index) => `${index}`}
        columns={this.columns()}
        size="small"
        dataSource={employees}
        footer={() => <span>Total employees: {employees.length}</span>}
      />
    );
  }

  private columns(): Array<ColumnProps<Employee>> {
    return [
      {
        title: "Name",
        width: 200,
        key: "name",
        dataIndex: "name",
        sorter: (e1, e2) => e1.name.localeCompare(e2.name),
      },
      {
        title: "Job Title",
        width: 200,
        key: "jobTitle",
        dataIndex: "jobTitle",
        sorter: (e1, e2) => e1.jobTitle.localeCompare(e2.jobTitle),
      },
      {
        title: "Tenure",
        width: 50,
        key: "tenure",
        dataIndex: "tenure",
        sorter: (e1, e2) => Number(e1.tenure) - Number(e2.tenure),
      },
      {
        title: "Gender",
        width: 200,
        key: "gender",
        dataIndex: "gender",
        sorter: (e1, e2) => e1.gender.localeCompare(e2.gender),
        render: (gender: string) => gender.substr(0, 1),
      },
    ];
  }
}
