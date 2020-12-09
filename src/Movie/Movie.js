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
  console.log(props);
  return (
    <section className="movie-page">
      <h1>{title}</h1>
      <section className="movie-overview">
        <img className="movie-image" src={poster_path} alt={title} />
        <section className="movie-info">
          <article className="movie-trailer">
            <ReactPlayer url={props.movieTrailer} />
          </article>
          <article className="movie-details">
            {average_rating}
            {overview}
          </article>
        </section>
      </section>
    </section>
  );
};

export default Movie;
