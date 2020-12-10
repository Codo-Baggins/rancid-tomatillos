import "./App.scss";
import Nav from "../Nav/Nav";
import React, { Component } from "react";
import MovieContainer from "../MovieContainer/MovieContainer";
import Movie from "../Movie/Movie";
import { callApi, callSingleApi, callSingleApiVideo } from "../callApis";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TopTen from "../TopTen/TopTen";

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      movieSelected: {},
      filteredMovies: [],
      movieSelectedVideo: "",
      topTen: [],
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
      .then((data) =>
        this.setState({
          movieSelectedVideo: this.filterVideoTypes(data.videos),
        })
      )
      .catch((error) => this.setState({ error }));
  };

  filterVideoTypes = (types) => {
    //non stop running, why?
    const displayVideo = types.find((video) => video.type === "Trailer");
    return `https://www.youtube.com/watch?v=${displayVideo.key}/videos`;
  };

  returnHome = () => {
    this.setState({
      filteredMovies: this.state.movies,
    });
    //clear form
  };

  componentDidMount() {
    callApi()
      .then((data) =>
        this.setState({
          filteredMovies: data.movies,
          movies: data.movies,
          topTen: this.filterTopTenMovies(data.movies),
        })
      )
      .catch((error) => this.setState({ error }));

    //in then, fetch single movie api
    //combine into one object
    //.then(fetch)
    //massaging the data
  }

  filterMoviesByTitle = (results) => {
    const filteredMovies = this.state.movies.filter((movie) => {
      return movie.title.toLowerCase().includes(results.toLowerCase());
    });
    this.setState({ filteredMovies });
  };

  filterTopTenMovies = (movies) => {
    const test = movies;
    const sortedMovies = test.sort((a, b) => {
      return b.average_rating - a.average_rating;
    });
    const topTen = sortedMovies.filter((movie) => {
      return sortedMovies.indexOf(movie) < 10;
    });
    return topTen;
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Nav
            returnHome={this.returnHome}
            filterMovies={this.filterMoviesByTitle}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return (
                  <div className="entire-movie-section">
                    <section>
                      <TopTen
                        topTen={this.state.topTen}
                        handleClick={this.handleClick}
                      />
                    </section>
                    <section>
                      <MovieContainer
                        movies={this.state.filteredMovies}
                        handleClick={this.handleClick}
                      />
                    </section>
                  </div>
                );
              }}
            />

            <Route
              path="/movie/:id"
              render={({ match }) => {
                return (
                  <Movie
                    movieSelected={this.state.movieSelected}
                    //need to pass down and add to Movie component
                    movieTrailer={this.state.movieSelectedVideo}
                  />
                );
              }}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
