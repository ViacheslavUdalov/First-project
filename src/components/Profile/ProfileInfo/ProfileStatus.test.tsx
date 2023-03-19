import {render, screen} from "@testing-library/react";
import ProfileStatus from "./ProfileStatus";

test('renders learn react link', () => {
   render(<ProfileStatus status="Hello"  updateStatus={() => {}}/>);
   // let ss = root.component;
    const linkElement = screen.getByText(/Hello/i);
    expect(linkElement).toBeInTheDocument();
});
test('during launch there is a "span" on screen',  () => {
    render(<ProfileStatus status="Hello"  updateStatus={() => {}}/>)
    const span = screen.getByRole("span");
    expect(span).toBeInTheDocument();
});
test('during launch there is not a "input" on screen',  () => {
    render(<ProfileStatus status="Hello"  updateStatus={() => {}}/>)
    expect(() => {
        let input = screen.getByRole("input")
    }).toThrow();
});
