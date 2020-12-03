import React from 'react'
import MovieCard from '../MovieCard/MovieCard'
import './MovieContainer.scss'

const MovieContainer = (props) => {
  const movieInformation = props.movies.map((movie, index) => {
    return (
      <MovieCard
        imgUrl={movie.poster_path}
        id={movie.id}
        key={movie.id}
        title={movie.title}
        released={movie.release_date}
        handleClick={props.handleClick}
        movieIndex={index}
      />
    )
  })

  return (
    <main className="movie-container">{movieInformation}</main>
  )
}

export default MovieContainer