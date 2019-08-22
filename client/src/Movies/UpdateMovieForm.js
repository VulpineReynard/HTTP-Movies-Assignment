import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const UpdateMovieForm = (props) => {
  let movie = props.location.state;

  console.log(props)
  console.log(movie);
  
  const [updatedMovie, setUpdatedMovie] = useState({
    id: movie.id,
    title: movie.title,
    director: movie.director,
    metascore: parseInt(movie.metascore),
    stars: movie.stars
  });

  const updateMovie = (movieId) => {
    axios.put(`http://localhost:5000/api/movies/${movieId}`, updatedMovie)
      .then(res => {
        console.log(res);
        props.history.push('/')
      })
  }

  const handleChange = (e) => {

    if(e.target.name === "metascore") {
      setUpdatedMovie({
        ...updatedMovie,
        metascore: e.target.value
      })
      
    } else { 

      setUpdatedMovie({
        ...updatedMovie,
        [e.target.name]: e.target.value
      })
    }
    console.log(updatedMovie)
  }

  return (
    <form 
    className="update-movie-form"
    onSubmit={(e) => {
      e.preventDefault();
      updateMovie(movie.id);
      }}>

      <label>Title</label>
      <input 
      name="title"
      onChange={(e) => handleChange(e)}
      value={updatedMovie.title}
      />

      <label>Director</label>
      <input 
      name="director"
      onChange={(e) => handleChange(e)}
      value={updatedMovie.director}
      />

      <label>Metascore</label>
      <input 
      name="metascore"
      onChange={(e) => handleChange(e)}
      value={updatedMovie.metascore}
      />

      <button>Submit</button>
    </form>
  );
}

export default UpdateMovieForm;