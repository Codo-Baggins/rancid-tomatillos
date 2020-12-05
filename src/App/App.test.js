import React from 'react'
import ReactDOM from 'react-dom'
import { screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App.js'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('App', () => {
  it('can add a new idea', () => {
    render(<App />);
    //form integration test
    // fireEvent.change(screen.getByPlaceholderText('title'), {target: {value: 'Best!'}});
    // fireEvent.change(screen.getByPlaceholderText('description'), {target: {value: 'Idea!'}});
    // fireEvent.click(screen.getByText('Submit!'));

    expect(screen.getByText('Rancid Tomatillos')).toBeInTheDocument()

    // expect(screen.getByText("Best!")).toBeInTheDocument();
    // expect(screen.getByText("Idea!")).toBeInTheDocument();
  });
});
