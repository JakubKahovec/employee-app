import { Menu } from "antd";
import "antd/dist/antd.css";
import { push, ConnectedRouter } from "connected-react-router";
import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import "./App.css";
import { routes } from "./Routes";
import Dashboard from "./features/Dashboard/Dashboard";
import AddEmployeeForm from "./features/Employees/EmployeeForm/AddEmployeeForm";
import store, { history } from "./store";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <>
              <Switch>
                <Route exact path={`${routes.addNewEmployee}`} render={() => <AddEmployeeForm />} />
                <Route exact path={`${routes.dashboard}`} render={() => <Dashboard />} />
                <Route render={() => <Navigation />} />
              </Switch>
            </>
          </ConnectedRouter>
        </Provider>
      </div>
    );
  }
}

const Navigation = () => {
  return (
    <Menu mode="inline">
      <Menu.ItemGroup key="g1" title="Navigation menu">
        <Menu.Item key="1" onClick={() => store.dispatch(push(routes.dashboard))}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="2" onClick={() => store.dispatch(push(routes.addNewEmployee))}>
          Add new employee
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );
};

export default App;
