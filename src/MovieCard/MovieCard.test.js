import React from "react";
import { screen, render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieCard from "./MovieCard.js";
import { MemoryRouter } from "react-router-dom";

describe("MovieCard", () => {
  afterEach(() => cleanup());
  it("should render correctly", () => {
    render(
      <MemoryRouter>
        <MovieCard
          imgUrl={
            "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg"
          }
          id={123456}
          title="Cheech and Chong"
          avgRating="4.222226"
          handleClick={jest.fn()}
          movieIndex={0}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Cheech and Chong")).toBeInTheDocument();
    expect(screen.getByText("4.2/10")).toBeInTheDocument();
    expect(screen.getByAltText("Cheech and Chong")).toBeInTheDocument();
  });

  it("should call handleClick with the correct movieIndex", () => {
    const mockHandleClick = jest.fn();
    render(
      <MemoryRouter>
        <MovieCard
          imgUrl={
            "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg"
          }
          id={123456}
          title="Cheech and Chong"
          avgRating="4.222226"
          handleClick={mockHandleClick}
          movieIndex={0}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Cheech and Chong"));
    expect(mockHandleClick).toHaveBeenCalledWith(123456);

    fireEvent.click(screen.getByAltText("Cheech and Chong"));
    expect(mockHandleClick).toHaveBeenCalledWith(123456);

    fireEvent.click(screen.getByText("4.2/10"));
    expect(mockHandleClick).toHaveBeenCalledWith(123456);
  });
});
