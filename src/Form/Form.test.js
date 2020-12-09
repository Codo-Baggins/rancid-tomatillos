import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Form from './Form'

describe('Form', () => {
  it('should render correctly', () => {
      render(<Form />)
      const inputField = screen.getByPlaceholderText('Search For A Movie Title');

      expect(inputField).toBeInTheDocument();
  });
})