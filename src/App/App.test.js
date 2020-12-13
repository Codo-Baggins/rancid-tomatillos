import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  cleanup,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "./App.js";
import * as apiCalls from "../callApis";
import { MemoryRouter } from "react-router-dom";
jest.mock("../callApis.js");

describe("App", () => {
  beforeEach(() => {
    apiCalls.callApi.mockResolvedValue({
      movies: [
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
      ],
    });

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
      videos: [{
        id: 330,
        movie_id: 694919,
        key: "aETz_dRDEys",
        site: "YouTube",
        type: "Trailer"
      }]
    })
  });

  afterAll(() => cleanup());
  it("should display movies when the App renders", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const movieOne = await waitFor(() => screen.getByText("Money Plane"));
    expect(movieOne).toBeInTheDocument();
  });

  it('should load the Nav bar when the App renders', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByAltText('Home Button')).toBeInTheDocument();
  })

  it("should load a movie page when a movie is clicked on", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const singleMovie = await waitFor(() =>
      screen.getByRole("img", { name: /Money Plane/i })
    );
    fireEvent.click(singleMovie);

    const displayMovie = await waitFor(() =>
      screen.getByText(6.7)
    );
    expect(displayMovie).toBeInTheDocument();
  });

  it("should load all movies from the movie page after clicking the tomatillo button", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const homeButton = await waitFor(() => screen.getByRole("link", { name: /home button/i }))

    fireEvent.click(homeButton);

    const singleMovie = await waitFor(() => screen.getByRole('link', { name: /money plane/i }));

    expect(singleMovie).toBeInTheDocument
  });

  it("should be able to filter movies by typing characters in the form", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
      ;
    const moneyPlane = await waitFor(() =>
      screen.getByRole("img", { name: /money plane/i })
    );
    const mulan = await waitFor(() =>
      screen.getByRole("img", { name: /mulan/i })
    );
    const inputField = screen.getByPlaceholderText("Search For A Movie Title");

    userEvent.type(inputField, "mo");

    expect(moneyPlane).toBeInTheDocument();
    expect(mulan).not.toBeInTheDocument();
  });
});