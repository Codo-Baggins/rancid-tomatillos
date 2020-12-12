import "./App.scss";
import Nav from "../Nav/Nav";
import React, { Component } from "react";
import MovieContainer from "../MovieContainer/MovieContainer";
import Movie from "../Movie/Movie";
import { callApi, callSingleApi, callSingleApiVideo } from "../callApis";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from 'prop-types';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      movieSelected: {},
      filteredMovies: [],
      movieSelectedVideo: "",
      error: null,
    };
  }

  handleClick = (id) => {
    this.getSingleApi(id);
    this.getSingleApiVideo(id);
  };

  getSingleApi = (id) => {
    callSingleApi(id)
      .then((data) => this.setState({ movieSelected: data.movie }))
      .catch((error) => this.setState({ error }));
  };

  getSingleApiVideo = (id) => {
    callSingleApiVideo(id)
      .then((data) => this.setState({ movieSelectedVideo: this.filterVideoTypes(data.videos) }))
      .catch((error) => this.setState({ error }));
  };

  filterVideoTypes = (types) => {
    const displayVideo = types.find((video) => video.type === "Trailer");
    return `https://www.youtube.com/watch?v=${ displayVideo.key }/videos`;
  };

  returnHome = () => {
    this.setState({
      filteredMovies: this.state.movies,
      movieSelected: {},
      movieSelectedVideo: ""
    });
  };

  componentDidMount() {
    callApi()
      .then((data) =>
        this.setState({ filteredMovies: data.movies, movies: data.movies })
      )
      .catch((error) => this.setState({ error }));
  }

  filterMoviesByTitle = (results) => {
    const filteredMovies = this.state.movies.filter((movie) => {
      return movie.title.toLowerCase().includes(results.toLowerCase());
    });
    this.setState({ filteredMovies });
  };

  render() {
    const searchResults = !this.state.filteredMovies.length ?
      <h1>No movie by that name! <br />Search for another title</h1> :
      <MovieContainer
        movies={ this.state.filteredMovies }
        handleClick={ this.handleClick }
      />
    return (
      <Router>
        <div className="App">
          <Nav
            returnHome={ this.returnHome }
            filterMovies={ this.filterMoviesByTitle }
          />
          <Switch>
            <Route
              exact
              path="/"
              render={ () => {
                return (
                  searchResults
                );
              } }
            />
            <Route
              path="/movie/:id"
              render={ ({ match }) => {
                return (
                  <Movie
                    movieSelected={ this.state.movieSelected }
                    movieTrailer={ this.state.movieSelectedVideo }
                  />
                );
              } }
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

App.propTypes = {
  movies: PropTypes.array,
  movieSelected: PropTypes.object,
  filteredMovies: PropTypes.array,
  movieSelectedVideo: PropTypes.string
}