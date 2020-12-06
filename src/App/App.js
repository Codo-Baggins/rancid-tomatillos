import './App.scss';
import Nav from '../Nav/Nav';
import React, { Component } from 'react';
//import movieData from '../movieData';
import MovieContainer from '../MovieContainer/MovieContainer';
import Movie from '../Movie/Movie';
import { callApi, callSingleApi } from '../callApis'


class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      movieSelected: {},
      filteredMovies: [],
      error: null
    }
  }

  handleClick = (id) => {
    callSingleApi(id)
    .then(data => this.setState({ movieSelected: data.movie }))
    .catch(error => this.setState({ error }))
  }

  returnHome = () => {
    this.setState({
      movieSelected: {},
      filteredMovies: []
    })
  }

  componentDidMount() {
    callApi()
      .then(data => this.setState({ movies: data.movies }))
      .catch(error => this.setState({ error }))
  }

  filterMoviesByTitle = (results) => {
    const filteredMovies = this.state.movies.filter(movie => {
      return movie.title.toLowerCase().includes(results.toLowerCase())
    })
    this.setState({ filteredMovies });
  }

  generateView() {
    if (this.state.filteredMovies.length && !Object.keys(this.state.movieSelected).length) {
      return <MovieContainer
        movies={ this.state.filteredMovies }
        handleClick={ this.handleClick }
      />
    } else if (Object.keys(this.state.movieSelected).length) {
      return <Movie movieSelected={ this.state.movieSelected } />
    }
    return <MovieContainer
      movies={ this.state.movies }
      handleClick={ this.handleClick }
    />
  }

  render() {
    //do calc on what we want to render
    return (
      <div className="App">
        <Nav
          returnHome={ this.returnHome }
          filterMovies={ this.filterMoviesByTitle }
        />
        {this.generateView()}
      </div>
    );
  }
}

export default App;
