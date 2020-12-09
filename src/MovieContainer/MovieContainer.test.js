import React from "react";
import { screen, render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieContainer from "./MovieContainer.js";
import { MemoryRouter } from "react-router-dom";

describe("Movie", () => {
  afterEach(() => cleanup());
  it("should render correctly", () => {
    render(
      <MemoryRouter>
        <MovieContainer
          movies={[
            {
              id: 694919,
              poster_path:
                "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
              backdrop_path:
                "https://image.tmdb.org/t/p/original//pq0JSpwyT2URytdFG0euztQPAyR.jpg",
              title: "Money Plane",
              average_rating: 6.666666666666667,
              release_date: "2020-09-29",
            },
            {
              id: 337401,
              poster_path:
                "https://image.tmdb.org/t/p/original//aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg",
              backdrop_path:
                "https://image.tmdb.org/t/p/original//zzWGRw277MNoCs3zhyG3YmYQsXv.jpg",
              title: "Mulan",
              average_rating: 4.909090909090909,
              release_date: "2020-09-04",
            },
          ]}

          //does this need to be here? handleClick is on the Movie component
          //handleClick={jest.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Money Plane")).toBeInTheDocument();
    expect(screen.getByText("Mulan")).toBeInTheDocument();

    expect(screen.getByText("2020-09-29")).toBeInTheDocument();
    expect(screen.getByText("2020-09-04")).toBeInTheDocument();

    expect(screen.getByAltText("Money Plane")).toBeInTheDocument();
    expect(screen.getByAltText("Mulan")).toBeInTheDocument();
  });
});
