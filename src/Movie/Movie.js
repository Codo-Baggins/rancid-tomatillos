import React from "react";
import "./Movie.scss";
import ReactPlayer from "react-player";

const Movie = (props) => {
  const {
    title,
    poster_path,
    url,
    backdrop_path,
    overview,
    average_rating,
  } = props.movieSelected;

  return (
    <section className="movie-page">
      <img className="movie-background" src={ backdrop_path } alt={ title } />
      <div className="card-styling">
        <p className="title">{ title }</p>
        <section className="movie-overview">
          <div className="movie-poster">
            <img className="movie-image" src={ poster_path } alt={ title } />
            <div className="rating">
              <div className="rating-style">Rating</div>
              { Number(average_rating).toFixed(1) }
            </div>
          </div>
          <section className="movie-info">
              { overview }
            <div className="movie-trailer">
              <ReactPlayer
                className="react-player"
                url={ props.movieTrailer }
                height='90%'
                width='90%'
              />
            </div>
          </section>
        </section>
      </div>

    </section>
  );
};

export default Movie;
