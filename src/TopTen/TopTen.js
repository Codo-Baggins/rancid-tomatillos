import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import "../TopTen/TopTen";

const TopTen = (props) => {
  console.log(props);
  const topTenMovies = props.topTen.map((movie, index) => {
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
    );
  });
  return <section className="top-ten">{topTenMovies}</section>;
};
export default TopTen;
