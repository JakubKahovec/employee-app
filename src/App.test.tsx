import { render } from "@testing-library/react";
import * as React from "react";
import App from "./App";

it("renders learn react link", () => {
  const { getByText } = render(<App />);
  const dashboardLink = getByText(/Dashboard/i);
  const addNewEmployeeLink = getByText(/Add new employee/i);
  expect(dashboardLink).toBeInTheDocument();
  expect(addNewEmployeeLink).toBeInTheDocument();
});
