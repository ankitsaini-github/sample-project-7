import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {
  const deleteHandler=(id)=>{
    if(window.confirm('Want to delete ?'))
    props.onDeleteMovie(id);
  }
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
          onDelete={deleteHandler.bind(null,movie.id)}
        />
      ))}
    </ul>
  );
};

export default MovieList;
