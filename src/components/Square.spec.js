import {shallow} from 'enzyme';
import Square from './Square';

describe("rendering of Square component",() => {
    it("render Square component",() => {
        const squareComponent = shallow(<Square />);
        expect(squareComponent.exists()).toBe(true);
    });
});

describe("testing Square component",() => {
    it("display the value, which passed as prop",() => {
        const value = "X";
        const squareComponent = shallow(<Square value={value} />);
        expect(squareComponent.find('button').text()).toEqual('X');
    });

    it("invoke the handler function when the button is clicked",() => {
        const mockFunc = jest.fn();
        const squareComponent = shallow(<Square onSquareClick={mockFunc}/>);
        squareComponent.find('button').simulate('click');
        expect(mockFunc).toHaveBeenCalled();
    });
});