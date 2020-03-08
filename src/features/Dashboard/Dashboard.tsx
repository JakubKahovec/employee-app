import { Alert, Button } from "antd";
import { routerActions } from "connected-react-router";
import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "typesafe-actions";
import { routes } from "../../Routes";
import * as employeeActions from "../Employees/EmployeesActions";
import { EmployeeByGenderBarChart } from "./Charts/EmployeesByGenderBarChart/EmployeesByGenderBarChart";
import { EmployeeByJobTitlePieChart } from "./Charts/EmployeesByJobTitlePieChart/EmployeesByJobTitlePieChart";
import "./Dashboard.css";
import { EmployeeList } from "./EmployeeList/EmployeeList";

export class Dashboard extends React.Component<Props> {
  componentDidMount() {
    this.props.loadEmployees();
  }

  render() {
    return (
      <div className="Dashboard">
        <div>
          <Button className="Dashboard-add-new-employee-button" onClick={this.handleAddNewEmployee}>
            Add Employee
          </Button>
        </div>
        <div>
          <EmployeeList employees={this.props.employees} isLoading={this.props.isLoadingEmployees} />;
          {this.props.loadEmployeesError ? (
            <Alert type="error" closable message={this.props.loadEmployeesError} />
          ) : null}
        </div>
        <div>
          <div>
            <EmployeeByJobTitlePieChart employees={this.props.employees} />
          </div>
          <div>
            <EmployeeByGenderBarChart employees={this.props.employees} />
          </div>
        </div>
      </div>
    );
  }

  handleAddNewEmployee = () => {
    this.props.goTo(routes.addNewEmployee);
  };
}

const mapStateToProps = (state: RootState) => ({
  isLoadingEmployees: state.employees.isLoadingEmployees,
  loadEmployeesError: state.employees.loadEmployeesError,
  employees: state.employees.employees.allEmployees,
});
const dispatchProps = {
  loadEmployees: employeeActions.loadEmployeesAsync.request,
  goTo: routerActions.push,
};

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

export default connect(mapStateToProps, dispatchProps)(Dashboard);
