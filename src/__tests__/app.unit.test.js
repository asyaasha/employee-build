import React from "react";
import { shallow } from "enzyme";

import App from "../components/App";
import { MockedProvider } from "@apollo/react-testing";

const wrapper = shallow(
  <MockedProvider>
    <App />
  </MockedProvider>
);

describe("App component", () => {
  it("Should render without an error", () => {
    expect(wrapper.length).toBe(1);
  });
});
