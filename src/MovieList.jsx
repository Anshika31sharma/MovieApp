import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTMxN2IwMWJlZjU1NjFmZmJiMDc3MzliYzRjNzQ0ZSIsInN1YiI6IjY2MjIwMjA2ZTRiNTc2MDE3ZGJkMTZkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1JgU2wEBYBO5thdRVD6-KwdrVbRUzZR7uxXuFTlbqnM",
  },
};

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="max-w-xs rounded overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        className="lg:w-full w-40 lg:h-80 h-40 md:w-full md:h-80 object-cover"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="px-6 py-4">
        <div className="font-bold lg:text-xl md:text-xl text-sm mb-2">{movie.title}</div>
        <p className="text-gray-700 lg:text-base md:text-base text-sm line-clamp-3">{movie.overview}</p>
      </div>
    </Link>
  );
};

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      options
    )
      .then((response) => response.json())
      .then((data) => setMovies(data.results))
      .catch((err) => console.error(err));
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-2">
      <h1 className="lg:text-3xl text-xl font-bold mb-8 mt-10 text-center">
        Search your favourite Movie
      </h1>
      <input
        type="text"
        placeholder="Search for a movie..."
        className="lg:w-96 w-64 p-2 border flex rounded mb-16 mx-auto"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
