import './App.scss';
import Nav from './Nav'
import React, { Component } from 'react';
import movieData from './movieData'
import MovieContainer from './MovieContainer'

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: movieData.movies
    }
  }

  handleClick= (event) => {
    console.log(event.target)
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <MovieContainer
          movies={this.state.movies}
          handleClick={this.handleClick}
        />
      </div>
    );
  }
}

export default App;
