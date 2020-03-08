import { Employee } from "AppModel";
import { Alert, Button, Form, Input, InputNumber, Select } from "antd";
import { routerActions } from "connected-react-router";
import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "typesafe-actions";
import { routes } from "../../../Routes";
import * as actions from "../EmployeesActions";
import "./AddEmployeeForm.css";

export class AddEmployeeForm extends React.Component<Props> {
  render() {
    return (
      <div className="AddEmployeeForm">
        <h3>Add new employee</h3>
        <Form {...layout} name="basic" initialValues={{}} onFinish={this.onFinish}>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input your name" }]}>
            <Input placeholder="Employee full name" />
          </Form.Item>
          <Form.Item
            label="Job Title"
            name="jobTitle"
            rules={[{ required: true, message: "Please input your job title" }]}
          >
            <Input placeholder="Job title" />
          </Form.Item>
          <Form.Item name="gender" label="Gender" rules={[{ required: true, message: "Please select gender" }]}>
            <Select placeholder="Select a gender" allowClear>
              <Option value="Male">male</Option>
              <Option value="Female">female</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="tenure"
            label="Tenure"
            rules={[{ required: true, type: "number", min: 1, max: 99, message: "Please select tenure" }]}
          >
            <InputNumber placeholder="Tenure" />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button onClick={this.onCancel}>Cancel</Button>
            <Button loading={this.props.isSavingEmployee} data-testid="submit-button" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        {this.props.saveEmployeeError ? <Alert type="error" closable message={this.props.saveEmployeeError} /> : null}
      </div>
    );
  }

  onFinish = (values: any) => {
    this.props.saveEmployee(values as Employee);
  };

  onCancel = () => {
    this.props.goTo(routes.dashboard);
  };
}

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

const mapStateToProps = (state: RootState) => ({
  isSavingEmployee: state.employees.isSavingEmployees,
  saveEmployeeError: state.employees.saveEmployeeError,
});
const dispatchProps = {
  saveEmployee: actions.saveEmployeeAsync.request,
  goTo: routerActions.push,
};

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

export default connect(mapStateToProps, dispatchProps)(AddEmployeeForm);
