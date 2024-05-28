import {shallow} from 'enzyme';
import { fireEvent, render } from '@testing-library/react';
import Board from './Board';

describe("Rendering of Board component",() => {
    it("render Board component",() => {
        const boardComponent = shallow(<Board />);
        expect(boardComponent.exists()).toBe(true);
    });

    it("initial state as X's turn",() => {
        const statusText = "Next Player is: X";
        const boardComponent = shallow(<Board />);
        const statusDiv = boardComponent.find('.status-text');
        expect(statusDiv.text()).toEqual(statusText);
    });

    it("render Board component with 9 Square component",() => {
        const { getAllByTestId } = render(<Board />);
        const squareComponents = getAllByTestId('square');
        expect(squareComponents.length).toBe(9);
    });
});

describe("Testing Board component",() => {
    it("display the value of the player on square, when square is clicked",() => {
        const { getAllByTestId } = render(<Board />);
        const squareComponents = getAllByTestId('square');
        fireEvent.click(squareComponents[0]);
        expect(squareComponents[0]).toHaveTextContent('X');
    });

    it("alter the turns",() => {
        const { getByTestId, getAllByTestId } = render(<Board />);
        const squareComponents = getAllByTestId('square');
        let statusDiv = getByTestId('status-text');

        //initial state
        expect(statusDiv).toHaveTextContent('Next Player is: X');

        //X's turn
        fireEvent.click(squareComponents[0]);
        expect(squareComponents[0]).toHaveTextContent('X');
        expect(statusDiv).toHaveTextContent('Next Player is: O');

        //O's turn
        fireEvent.click(squareComponents[3]);
        expect(squareComponents[3]).toHaveTextContent('O');
        expect(statusDiv).toHaveTextContent('Next Player is: X');
    });

    it("disable click on the square, when the square is already clicked",() => {
        const { getAllByTestId } = render(<Board />);
        const squareComponents = getAllByTestId('square');
        fireEvent.click(squareComponents[1]);
        expect(squareComponents[1]).toHaveTextContent('X');

        //try to click the same square
        fireEvent.click(squareComponents[1]);
        expect(squareComponents[1]).toHaveTextContent('X');
    });
});

describe("Testing calculateWinner function",() => {
    it("declare the winner",() => {
        const {getByTestId, getAllByTestId} = render(<Board />);
        const squareComponents = getAllByTestId('square');
        fireEvent.click(squareComponents[0]);
        fireEvent.click(squareComponents[1]);
        fireEvent.click(squareComponents[3]);
        fireEvent.click(squareComponents[4]);
        fireEvent.click(squareComponents[6]);
        const statusDiv = getByTestId('status-text');
        expect(statusDiv).toHaveTextContent('Winner is: X');
    });

    it("declare Match as draw, when turns are over",() => {
        const {getByTestId, getAllByTestId} = render(<Board />);
        const squareComponents = getAllByTestId('square');
        fireEvent.click(squareComponents[0]);
        fireEvent.click(squareComponents[1]);
        fireEvent.click(squareComponents[3]);
        fireEvent.click(squareComponents[4]);
        fireEvent.click(squareComponents[5]);
        fireEvent.click(squareComponents[6]);
        fireEvent.click(squareComponents[2]);
        fireEvent.click(squareComponents[8]);
        fireEvent.click(squareComponents[7]);
        const statusDiv = getByTestId('status-text');
        expect(statusDiv).toHaveTextContent('Match is Draw');
    });
});