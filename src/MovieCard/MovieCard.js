import React from 'react'
import './MovieCard.scss'


const MovieCard = (props) => {
  const { imgUrl, id, title, released, handleClick } = props;

//pass id instead of movieIndex
  return (
    <section className="movie-card" id={id} onClick={(event) => handleClick(id)}>
      <img className="movie-img" src={imgUrl} alt={title} />
      <h4 className="movie-title">{title}</h4>
      <p>{released}</p>
    </section>
  )
}

export default MovieCard