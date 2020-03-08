import { render } from "@testing-library/react";
import * as React from "react";
import { act } from "react-dom/test-utils";
import { createRenderer } from "react-test-renderer/shallow";
import { AddEmployeeForm } from "./AddEmployeeForm";

describe("AddEmployeeForm", () => {

  it("renders correctly", () => {
    const renderer = createRenderer();
    const tree = renderer.render(
      <AddEmployeeForm goTo={jest.fn()} saveEmployee={jest.fn()} saveEmployeeError="" isSavingEmployee={false} />,
    );
    expect(tree).toMatchSnapshot();
  });

  it("renders a save error message", () => {
    const { getByText } = render(
      <AddEmployeeForm
        goTo={jest.fn()}
        saveEmployee={jest.fn()}
        saveEmployeeError="Failed to save"
        isSavingEmployee={false}
      />,
    );
    const errorMsg = getByText(/Failed to save/i);
    expect(errorMsg).toBeInTheDocument();
  });

  it("prevents to submit on errors", async () => {
    const saveEmployee = jest.fn();
    const { container, getByTestId } = render(
      <AddEmployeeForm goTo={jest.fn()} saveEmployee={saveEmployee} saveEmployeeError="" isSavingEmployee={false} />,
    );
    const submitBtn = getByTestId("submit-button");
    jest.useFakeTimers();
    await act(async () => {
      submitBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      jest.runAllTimers();
    });
    const errorSelectName = container.querySelector(".ant-form-item-has-error");
    expect(saveEmployee).toBeCalledTimes(0);
    expect(errorSelectName).toBeInTheDocument();
  });
});
