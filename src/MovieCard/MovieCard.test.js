import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import { getByText, getByAltText } from '@testing-library/dom'
//do we need this for testing?
import '@testing-library/jest-dom'
import MovieCard from './MovieCard.js'

describe('MovieCard', () => {
  it('should render correctly', () => {
    render(<MovieCard
      imgUrl={'https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg'}
      id={123456}
      title="Cheech and Chong"
      released="2020-09-29"
      handleClick={jest.fn()}
      movieIndex={0}
    />)

    expect(screen.getByText('Cheech and Chong')).toBeInTheDocument();
    expect(screen.getByText('2020-09-29')).toBeInTheDocument();

    //are we testing for image or if img node is on page?
    expect(screen.getByAltText('Cheech and Chong')).toBeInTheDocument();
  })

  it('should call handleClick with the correct movieIndex', () => {
    const mockHandleClick = jest.fn()
    render(
      <MovieCard
        imgUrl={'https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg'}
        id={123456}
        title="Cheech and Chong"
        released="2020-09-29"
        handleClick={mockHandleClick}
        movieIndex={0}
    />)

      //click on outer area too
    fireEvent.click(screen.getByText('Cheech and Chong'))
    expect(mockHandleClick).toHaveBeenCalledWith(0)

    fireEvent.click(screen.getByAltText('Cheech and Chong'))
    expect(mockHandleClick).toHaveBeenCalledWith(0)

    fireEvent.click(screen.getByText('2020-09-29'))
    expect(mockHandleClick).toHaveBeenCalledWith(0)
  })
})