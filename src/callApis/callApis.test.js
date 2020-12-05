import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App/App';

import { fireEvent, render, screen, wait, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { callApi, callSingleApi } from './callApis';
jest.mock('./callApis.js');

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

describe('App', () => {
  beforeEach(() => {

    callApi.mockResolvedValue({
      movies: [
        {
          "id": 694919,
          "poster_path": "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
          "backdrop_path": "https://image.tmdb.org/t/p/original//pq0JSpwyT2URytdFG0euztQPAyR.jpg",
          "title": "Money Plane",
          "average_rating": 6.666666666666667,
          "release_date": "2020-09-29"
        },
        {
          "id": 337401,
          "poster_path": "https://image.tmdb.org/t/p/original//aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg",
          "backdrop_path": "https://image.tmdb.org/t/p/original//zzWGRw277MNoCs3zhyG3YmYQsXv.jpg",
          "title": "Mulan",
          "average_rating": 4.909090909090909,
          "release_date": "2020-09-04"
        }
      ]
    });

    callSingleApi.mockResolvedValue({
      movie: {
        "id": 694919,
        "title": "Money Plane",
        "poster_path": "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
        "backdrop_path": "https://image.tmdb.org/t/p/original//pq0JSpwyT2URytdFG0euztQPAyR.jpg",
        "release_date": "2020-09-29",
        "overview": "A professional thief with $40 million in debt and his family's life on the line must commit one final heist - rob a futuristic airborne casino filled with the world's most dangerous criminals.",
        "genres": [
          "Action"
        ],
        "budget": 0,
        "revenue": 0,
        "runtime": 82,
        "tagline": "",
        "average_rating": 6.666666666666667
      }
    })
  });

  describe('App', () => {


    it('should display movies when the App renders', async () => {
      render(<App />);

      const movieOne = await waitFor(() => screen.getByText('Money Plane'));
      expect(movieOne).toBeInTheDocument();
    })

    it('should load a movie page when a movie is clicked on', async () => {

      render(<App />);

      const singleMovie = await waitFor(() => screen.getByRole('img', { name: /money plane/i }));
      fireEvent.click(singleMovie);

      const displayMovie = await waitFor(() => screen.getByText(6.666666666666667));
      expect(displayMovie).toBeInTheDocument();
    })

    it('should load all movies from the movie page after clicking the tomatillo button', async () => {

      render(<App />);

      const singleMovie = await waitFor(() => screen.getByRole('img', { name: /money plane/i }));
      fireEvent.click(singleMovie);

      const displayMovie = await waitFor(() => screen.getByText(6.666666666666667));
      expect(displayMovie).toBeInTheDocument();

      fireEvent.click(screen.getByRole('img', { name: /home button/i }))
      expect(screen.getByText('Mulan')).toBeInTheDocument()
    })
  })


  //do we need this Nav test? Testing this functionality in Nav componenet
  describe("Nav", () => {
    it("Should have a nav with a button", () => {
      render(<App />);

      expect(screen.getByText("Rancid Tomatillos")).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /home button/i })).toBeInTheDocument();
    });
  });


});

