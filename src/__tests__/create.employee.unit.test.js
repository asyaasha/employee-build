import React from "react";
import { shallow } from "enzyme";
import { MockedProvider } from "@apollo/react-testing";
import CreateEmployeeComponent from "../components/CreateEmployeeComponent";

const wrapper = shallow(
  <MockedProvider>
    <CreateEmployeeComponent />
  </MockedProvider>
);

describe("CreateEmployeeComponent component", () => {
  it("Should render without an error", () => {
    expect(wrapper.length).toBe(1);
  });
});
