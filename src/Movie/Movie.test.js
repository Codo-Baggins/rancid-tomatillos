import React from "react";
import { screen, render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Movie from "./Movie.js";

describe("Movie", () => {
  afterEach(() => cleanup());

  it("should render correctly", () => {
    render(
      <Movie
        movieSelected={{
          id: 694919,
          poster_path:
            "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
          backdrop_path:
            "https://image.tmdb.org/t/p/original//pq0JSpwyT2URytdFG0euztQPAyR.jpg",
          title: "Money Plane",
          average_rating: 6.666666666666667,
          release_date: "2020-09-29",
        }}
      />
    );

    expect(screen.getByText("Money Plane")).toBeInTheDocument();

    expect(screen.getByText(6.666666666666667)).toBeInTheDocument();
  });
});
