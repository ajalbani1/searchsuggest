import React from "react";
import { shallow, configure } from "enzyme";
import SearchSelector from "./SearchSelector";
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const wrapper = shallow(<SearchSelector multi={ false } values={[ { name: "Bulgaria" }, { name: "Tunisia"} ]}/>);

describe("SearchSelector", () => {
    it("renders a default SearchSelector", () => {
        expect(wrapper.state("values")).toHaveLength(2);
    });
    it("renders the list of suggestions", () => {
        wrapper.find("input[type='text']").simulate("click");
        let suggestions = wrapper.find(".suggestions");
        expect(suggestions).toHaveLength(2);
    });
});