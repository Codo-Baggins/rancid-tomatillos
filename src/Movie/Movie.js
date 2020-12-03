import React from 'react';
import './Movie.scss';

const Movie = (props) => {
  return (
    <section className="movie-page">
      <h1>{ props.movieSelected.title }</h1>
      <section className="movie-overview">
        <img className="movie-image" src={ props.movieSelected.poster_path }/>
        <section className="movie-info">
          <article className="rating">
          { props.movieSelected.average_rating }
          </article>
          <article className="movie-details">
          Some Details
          </article>
        </section>
      </section>
    </section>
  )
}

export default Movie;