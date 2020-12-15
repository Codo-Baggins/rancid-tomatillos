import React from "react";
import { screen, render, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Movie from "./Movie.js";
import * as apiCalls from "../callApis";
jest.mock("../callApis.js");

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
    expect(screen.getByText(6.7)).toBeInTheDocument();
  });

  it("Should display a loading message if the trailer hasnt loaded", () => {
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

    const loadingTrailerMessage = screen.getByText("...Loading Trailer...");

    expect(loadingTrailerMessage).toBeInTheDocument();
  });

  it("Should display a loading message if the trailer hasnt loaded", () => {
    render(
      <Movie
        movieSelected={{
          id: 694919,
          poster_path: undefined,
          backdrop_path:
            "https://image.tmdb.org/t/p/original//pq0JSpwyT2URytdFG0euztQPAyR.jpg",
          title: "Money Plane",
          average_rating: 6.666666666666667,
          release_date: "2020-09-29",
        }}
      />
    );

    const loadingMoviePosterMessage = screen.getByText(
      "...Loading Movie Poster..."
    );

    expect(loadingMoviePosterMessage).toBeInTheDocument();
  });

  it("Should render a movie trailer for that movie", async () => {
    apiCalls.callSingleApi.mockResolvedValue({
      movie: {
        id: 694919,
        title: "Money Plane",
        poster_path:
          "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
        backdrop_path:
          "https://image.tmdb.org/t/p/original//pq0JSpwyT2URytdFG0euztQPAyR.jpg",
        release_date: "2020-09-29",
        overview:
          "A professional thief with $40 million in debt and his family's life on the line must commit one final heist - rob a futuristic airborne casino filled with the world's most dangerous criminals.",
        genres: ["Action"],
        budget: 0,
        revenue: 0,
        runtime: 82,
        tagline: "",
        average_rating: 6.666666666666667,
      },
    });
    apiCalls.callSingleApiVideo.mockResolvedValue({
      videos: [
        {
          id: 330,
          movie_id: 694919,
          key: "aETz_dRDEys",
          site: "YouTube",
          type: "Trailer",
        },
      ],
    });
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
        movieTrailer={"https://www.youtube.com/watch?v=aETz_dRDEys/videos"}
      />
    );
    const trailer = await waitFor(() => {
      return screen.getByTestId(694919);
    });

    expect(trailer).toBeInTheDocument();
  });
});
