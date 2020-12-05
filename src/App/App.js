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
      movieSelected: {}
    }
  }
  //integration test, tests the methods
  handleClick = (id) => {
    console.log(id)
    //fetch her for single movie
    // .then(data => this.setState({movieSelected: data}))
    callSingleApi(id)
      .then(data => this.setState({ movieSelected: data.movie }))
      .then(error => console.log(error))

  }

  handleSubmit = () => {
    //setState to fetch data?
    this.setState({ movieSelected: {} })
  }

  componentDidMount() {
    callApi()
      .then(data => this.setState({ movies: data.movies }))
      .then(error => console.log('error'))
  }
  //TESTS: More/less? How to do integration test?

  //click movie card, see if Movie is there
  //on Movie, click home to see if MovieContainer is there
  //test home button on home page still shows home page

  render() {
    return (
      <div className="App">
        <Nav handleSubmit={ this.handleSubmit } />
        { Object.keys(this.state.movieSelected).length ? <Movie movieSelected={ this.state.movieSelected } /> : <MovieContainer
          movies={ this.state.movies }
          handleClick={ this.handleClick }
        /> }
      </div>
    );
  }
}

export default App;
