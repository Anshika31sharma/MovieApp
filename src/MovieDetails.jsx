import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTMxN2IwMWJlZjU1NjFmZmJiMDc3MzliYzRjNzQ0ZSIsInN1YiI6IjY2MjIwMjA2ZTRiNTc2MDE3ZGJkMTZkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1JgU2wEBYBO5thdRVD6-KwdrVbRUzZR7uxXuFTlbqnM'
  }
};

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options);
        if (response.ok) {
          const data = await response.json();
          setMovieDetails(data);
        } else {
          console.error('Error fetching movie details');
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const { title, overview, adult, original_language, popularity, release_date, poster_path } = movieDetails;

  return (
    <div className="container mx-auto mt-10 p-2">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row">
        <img className="h-auto md:h-full w-full md:w-96 object-cover mb-6 md:mb-0" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
        <div className="p-6">
          <h2 className="lg:text-3xl  text-2xl font-bold mb-4">{title}</h2>
          <p className="text-gray-700 mb-4">{overview}</p>
          <p className="text-gray-700 mb-2"><span className="font-semibold">Adult:</span> {adult ? 'Yes' : 'No'}</p>
          <p className="text-gray-700 mb-2"><span className="font-semibold">Original Language:</span> {original_language}</p>
          <p className="text-gray-700 mb-2"><span className="font-semibold">Popularity:</span> {popularity}</p>
          <p className="text-gray-700 mb-2"><span className="font-semibold">Release Date:</span> {release_date}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
