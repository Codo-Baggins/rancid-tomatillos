import React from 'react'
import './MovieCard.scss'


const MovieCard = (props) => {
  const { imgUrl, id, title, released, handleClick, movieIndex } = props;


  return (
    <section className="movie-card" id={id} onClick={(event) => handleClick(movieIndex)}>
      <img className="movie-img" src={imgUrl} alt={title} />
      <h4 className="movie-title">{title}</h4>
      <p>{released}</p>
    </section>
  )
}

export default MovieCard