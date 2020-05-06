import React from "react";
import { shallow } from "enzyme";
import FormButton from "../components/FormButton";

const buttonProps = {
  size: "small",
  variant: "primary",
};
const wrapper = shallow(<FormButton {...buttonProps} />);

describe("FormButton component", () => {
  it("Should render passed props correctly", () => {
    expect(wrapper.props().children.props.variant).toEqual(buttonProps.variant);
    expect(wrapper.props().children.props.size).toEqual(buttonProps.size);
  });
});
