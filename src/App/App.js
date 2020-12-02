import './App.scss';
import Nav from '../Nav/Nav'
import React, { Component } from 'react';
import movieData from '../movieData'
import MovieContainer from '../MovieContainer/MovieContainer'

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: movieData.movies,
      movieSelected: {} 
    }
  }

  handleClick = (index) => {
    this.setState({ movieSelected: this.state.movies[index] })
  }

  render() {
    return (
      <div className="App">
        <Nav />
        { Object.keys(this.state.movieSelected).length ? <h2>Movie Title</h2> : <MovieContainer
          movies={this.state.movies}
          handleClick={this.handleClick}
        /> } 
      </div>
    );
  }
}

export default App;
