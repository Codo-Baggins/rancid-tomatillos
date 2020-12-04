import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
//import { getByText, getByAltText } from '@testing-library/dom'
import '@testing-library/jest-dom'
import Nav from './Nav.js'

describe('Nav', () => {
  it('should render correctly', () => {
    render(<Nav
      handleSubmit={jest.fn()}
    />)

    expect(screen.getByText('Rancid Tomatillos')).toBeInTheDocument();
    expect(screen.getByAltText('Home Button')).toBeInTheDocument();
  })

  it('should call handleSubmit', () => {
    const mockHandleSubmit = jest.fn()
    render(
      <Nav
        handleSubmit={mockHandleSubmit}
    />)

      //how to test for image clicked?
    fireEvent.click(screen.getByAltText('Home Button'))
    expect(mockHandleSubmit).toHaveBeenCalled()
  })
})