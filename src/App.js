import './App.css';
import { useState, useEffect } from 'react';
import Layout from './Components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import Trailer from './Components/Trailer/Trailer';
import Reviews from './Components/Reviews/Reviews'; // Assuming you have this component

function App() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);

  const getMovies = async () => {
    try {
      fetch('http://localhost:8080/api/v1/movies')
        .then(res => res.json())
        .then(resp => {
          console.log("Data:", resp);
          setMovies(resp);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const getMovieData = async (movieId) => {
    try {
      fetch(`http://localhost:8080/api/v1/movies/${movieId}`)
        .then(res => res.json())
        .then(resp => {
          console.log("Data:", resp);
          // Assuming resp is the movie object
          setMovie(resp); // Set the movie state with the fetched data
          // Assuming resp.reviews exists and contains the movie's reviews
          setReviews(resp.reviews || []); // Update reviews; ensure it's an array even if undefined
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home movies={movies} />} />
          <Route path="Trailer/:ytTrailerId" element={<Trailer />} />
          <Route path="Reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews} />} />
          <Route path="*" element = {<NotFound/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
