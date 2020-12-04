import './App.scss';
import Nav from '../Nav/Nav';
import React, { Component } from 'react';
import movieData from '../movieData';
import MovieContainer from '../MovieContainer/MovieContainer';
import Movie from '../Movie/Movie';

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: movieData.movies,
      movieSelected: {}
    }
  }
//integration test, tests the methods
  handleClick = (index) => {
    //fetch her for single movie
   // .then(data => this.setState({movieSelected: data}))
    this.setState({ movieSelected: this.state.movies[index] })
  }

  handleSubmit = () => {
    this.setState( { movies: movieData.movies, movieSelected: {} })
  }


//TESTS: More/less? How to do integration test?

//click movie card, see if Movie is there
//on Movie, click home to see if MovieContainer is there
//test home button on home page still shows home page

  render() {
    return (
      <div className="App">
        <Nav handleSubmit={ this.handleSubmit }/>
        { Object.keys(this.state.movieSelected).length ? <Movie movieSelected={ this.state.movieSelected } /> : <MovieContainer
          movies={this.state.movies}
          handleClick={this.handleClick}
        /> }
      </div>
    );
  }
}

export default App;
