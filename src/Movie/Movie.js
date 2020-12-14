import React from "react";
import "./Movie.scss";
import ReactPlayer from "react-player";
import thumbsUp from '../assets/001-thumbs-up-hand-symbol.png';
import thumbsDown from '../assets/002-thumbs-down-silhouette.png';
import PropTypes from 'prop-types';

const Movie = (props) => {
  const {
    title,
    poster_path,
    backdrop_path,
    overview,
    average_rating,
  } = props.movieSelected;

  const avgRating = Number(average_rating).toFixed(1);

  const thumbRating = avgRating >= 5.0 ?
    <img className="thumb" src={ thumbsUp } alt="thumb up" />
    : <img className="thumb" src={ thumbsDown } alt="thumb down" />;

  const loadRating = average_rating === undefined ? <h1>...loading</h1> : avgRating;

  const movieTrailer = !props.movieTrailer ?
    <h1>...Loading Trailer...</h1> :
    <ReactPlayer
      className="react-player"
      url={ props.movieTrailer }
      height='90%'
      width='90%'
    />;

  const moviePoster = !poster_path ?
    <h1>...Loading Movie Poster...</h1> :
    <img className="movie-image" src={ poster_path } alt={ title } />;

  return (
    <section className="movie-page">
      <img className="movie-background" src={ backdrop_path } alt={ title } />
      <div className="card-styling">
        <p className="title">{ title }</p>
        <section className="movie-overview">
          <div className="movie-poster">
            { moviePoster }
            <div className="rating">
              <div className="rating-style">Rating</div>
              { loadRating }
              <div>{ thumbRating }</div>
            </div>
          </div>
          <section className="movie-info">
            { overview }
            <div className="movie-trailer">
              { movieTrailer }
            </div>
          </section>
        </section>
      </div>
    </section>
  );
};

export default Movie;

Movie.propTypes = {
  title: PropTypes.string,
  poster_path: PropTypes.string,
  backdrop_path: PropTypes.string,
  overview: PropTypes.string,
  average_rating: PropTypes.number,
  movieTrailer: PropTypes.string,
}