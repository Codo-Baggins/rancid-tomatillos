import React from "react";
import { screen, render, fireEvent, cleanup } from "@testing-library/react";
//import { getByText, getByAltText } from '@testing-library/dom'
import "@testing-library/jest-dom";
import Nav from "./Nav.js";
import { MemoryRouter } from "react-router-dom";

describe("Nav", () => {
  afterEach(() => cleanup());

  it("should render correctly", () => {
    render(
      <MemoryRouter>
        <Nav handleSubmit={jest.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText("Rancid Tomatillos")).toBeInTheDocument();
    expect(screen.getByAltText("Home Button")).toBeInTheDocument();
  });

  it("should call handleSubmit", () => {
    const mockHandleSubmit = jest.fn();
    render(
      <MemoryRouter>
        <Nav returnHome={mockHandleSubmit} />
      </MemoryRouter>
    );

    //how to test for image clicked?
    fireEvent.click(screen.getByAltText("Home Button"));
    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});
