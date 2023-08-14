import { render, screen } from "@testing-library/react";
import Hero from ".";
import "@testing-library/jest-dom";

describe("Hero component", () => {
  it("should render the image", () => {
    render(<Hero />);

    const imageElement = screen.getByAltText("World");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "/images/world.svg");
  });
});
