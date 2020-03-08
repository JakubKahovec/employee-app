import * as React from "react";

import { createRenderer } from "react-test-renderer/shallow";
import { employee1, employee2, employee3 } from "../../Employees/__fixtures__/TestEmployees";
import { EmployeeList } from "./EmployeeList";

it("renders correctly EmployeeList", () => {
  const renderer = createRenderer();
  const tree = renderer.render(<EmployeeList employees={[employee1, employee2, employee3]} isLoading={true} />);
  expect(tree).toMatchSnapshot();
});
