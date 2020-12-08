import './App.scss';
import Nav from '../Nav/Nav';
import React, { Component } from 'react';
import MovieContainer from '../MovieContainer/MovieContainer';
import Movie from '../Movie/Movie';
import {
  callApi,
  callSingleApi,
  //import get video api
  callSingleApiVideo
} from '../callApis'
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from 'react-router-dom';

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      movieSelected: {},
      filteredMovies: [],
      //add video to state to display on movie page
      movieSelectedVideo: '',
      error: null
    }
  }

  handleClick = (id) => {
    this.getSingleApi(id);
    this.getSingleApiVideo(id);
  }

  //split methods to get api then add to handleClick
  getSingleApi = (id) => {
    callSingleApi(id)
      .then(data => this.setState({ movieSelected: data.movie }))
      .catch(error => this.setState({ error }))
  }

  getSingleApiVideo = (id) => {
    callSingleApiVideo(id)
      .then(data => this.setState({ movieSelectedVideo: this.filterVideoTypes(data.videos) }))
      .catch(error => this.setState({ error }))
  }

  //return url of video trailer, filter to find trailer (multiple types)

  filterVideoTypes = (types) => {
    //non stop running, why?
    const displayVideo = types.find(video => video.type === "Trailer");
    return `https://www.youtube.com/watch?v=${ displayVideo.key }/videos`
  }

  //can delete this w/ react router, state will overwrite itself with each click
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
    //how to incorporate form search into React Router?
    //filter w/ each keystroke
    //updating url with this?
    return (
      <Router>
        <div className="App">

          {/* Route to home with the button */ }
          <Nav
            returnHome={ this.returnHome }
            filterMovies={ this.filterMoviesByTitle }
          />
          <Switch>
            <Route exact path='/'
              render={ () => {
                return <MovieContainer
                  movies={ this.state.movies }
                  handleClick={ this.handleClick }
                />
              } } />

            <Route path="/movie/:id"
              render={ ({ match }) => {
                // logging 3 million times...
                console.log(this.state.movieSelectedVideo);

                this.handleClick(parseInt(match.params.id))
                return <Movie
                  movieSelected={ this.state.movieSelected }
                  //need to pass down and add to Movie component
                  movieTrailer={ this.state.movieSelectedVideo }
                />
              } }
            />

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
