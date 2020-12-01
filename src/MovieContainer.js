import React from 'react'
import MovieCard from './MovieCard'
import './MovieContainer.css'

const MovieContainer = (props) => {
  const movieInformation = props.movies.map(movie => {
    return (
      <MovieCard
        imgUrl={movie.poster_path}
        id={movie.id}
        key={movie.id}
        title={movie.title}
        released={movie.release_date}
      />
    )
  })

  return (
    <main className="movie-container">{movieInformation}</main>
  )
}

export default MovieContainer