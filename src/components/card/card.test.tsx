import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from ".";

describe("Card component", () => {
  it("should render title and content", () => {
    const mockProps = {
      title: "Test Title",
      content: "Test Content",
    };

    render(<Card {...mockProps} />);

    const titleElement = screen.getByText("Test Title");
    const contentElement = screen.getByText("Test Content");

    expect(titleElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
  });
});
