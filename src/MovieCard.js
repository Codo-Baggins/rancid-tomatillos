import React from 'react'

const MovieCard = (props) => {
  const { imgUrl, id, title, released } = props;
  return (
    <section id={id}>
      <img src={imgUrl} alt={title}/>
      <h4>{title}</h4>
      <p>{released}</p>
    </section>
  )
}

export default MovieCard