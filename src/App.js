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
  render() {
    return (
      <div className="App">
        <Nav />
        <MovieContainer movies={this.state.movies}/>
      </div>
    );
  }

}

export default App;
