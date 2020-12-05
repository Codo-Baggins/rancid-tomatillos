import React from 'react';
import App from '../App/App';

import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { callApi, callSingleApi } from './callApis';
jest.mock('./callApis.js');

describe('App', () => {
  beforeEach(() => {

      callApi.mockResolvedValue({movies: [
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
      ]});


  // it('when the App loads, we should see movies displayed', async () => {

  });

  describe('App', () => {
    it('when the App loads, we should see movies displayed', async () => {
      render(<App />);


      const movieOne = await waitFor(() => screen.getByText('Money Plane'));
      //const movieTwo = await waitFor(() => screen.getByText('Mulan'))
      expect(movieOne).toBeInTheDocument();
    })
  })

  describe("Nav", () => {
    it("Should have a nav with a button", () => {
      render(<App />);

      expect(screen.getByText("Rancid Tomatillos")).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /home button/i })).toBeInTheDocument();
    });
  });
})

