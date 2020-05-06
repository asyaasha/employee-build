import React from "react";
import { shallow } from "enzyme";
import FormInput from "../components/FormInput";

const nameProp = "firstname";
const wrapper = shallow(<FormInput name={nameProp} />);

describe("FormInput component", () => {
  it("Should render passed props correctly", () => {
    expect(wrapper.find("Controller").props().name).toEqual(nameProp);
  });
});
