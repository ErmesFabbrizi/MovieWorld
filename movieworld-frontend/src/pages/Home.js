// Home.js
import React, { useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const Home = () => {
  const [movies, setMovies] = useState([]);

  const searchMovie = async (query) => {
    const res = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: {
        api_key: "f245ddf2fa039b4ac103b86de1fc2df4",
        query
      }
    });
    setMovies(res.data.results);
  };

  return (
    <div className="container">
      <h2 className="my-4">Cerca un film</h2>
      <input className="form-control" onChange={e => searchMovie(e.target.value)} />
      <div className="row mt-4">
        {movies.map(m => <MovieCard key={m.id} movie={m} />)}
      </div>
    </div>
  );
};

export default Home;
