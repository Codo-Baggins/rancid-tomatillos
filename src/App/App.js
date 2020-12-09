import './App.scss';
import Nav from '../Nav/Nav';
import React, { Component } from 'react';
import MovieContainer from '../MovieContainer/MovieContainer';
import Movie from '../Movie/Movie';
import {
  callApi,
  callSingleApi,
  callSingleApiVideo
} from '../callApis'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      movieSelected: {},
      filteredMovies: [],
      movieSelectedVideo: '',
      error: null
    }
  }

  handleClick = (id) => {
    this.getSingleApi(id);
    this.getSingleApiVideo(id);
  }

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

  filterVideoTypes = (types) => {
    //non stop running, why?
    const displayVideo = types.find(video => video.type === "Trailer");
    return `https://www.youtube.com/watch?v=${ displayVideo.key }/videos`
  }

  returnHome = () => {
    this.setState({
      filteredMovies: this.state.movies
    })
    //clear form
  }

  componentDidMount() {
    callApi()
      .then(data => this.setState({ filteredMovies: data.movies, movies: data.movies }))
      .catch(error => this.setState({ error }))

    //in then, fetch single movie api
    //combine into one object
    //.then(fetch)
    //massaging the data
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
    return (
      <Router>
        <div className="App">
          <Nav
            returnHome={ this.returnHome }
            filterMovies={ this.filterMoviesByTitle }
          />
          <Switch>
            <Route exact path='/'
              render={ () => {
                return <MovieContainer
                  movies={ this.state.filteredMovies }
                  handleClick={ this.handleClick }
                />
              } } />

            <Route path="/movie/:id"
              render={ ({ match }) => {
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
