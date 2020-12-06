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
      error: null
    }
  }
  //integration test, tests the methods
  handleClick = (id) => {
    //fetch her for single movie
    // .then(data => this.setState({movieSelected: data}))
    callSingleApi(id)
      .then(data => this.setState({ movieSelected: data.movie }))
      .catch(error => this.setState({ error }))
  }

  returnHome = () => {
    this.setState({ movieSelected: {} })
  }

  componentDidMount() {
    callApi()
      .then(data => this.setState({ movies: data.movies }))
      .catch(error => this.setState({ error }))
  }

  render() {
    return (
      <div className="App">
        <Nav returnHome={ this.returnHome } />
        { Object.keys(this.state.movieSelected).length ? <Movie movieSelected={ this.state.movieSelected } /> : <MovieContainer
          movies={ this.state.movies }
          handleClick={ this.handleClick }
        /> }
      </div>
    );
  }
}

export default App;
