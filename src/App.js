import './App.css';
import { useState, useEffect } from 'react';
import Layout from './Components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';

function App() {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      fetch('http://localhost:8080/api/v1/movies')
        .then(res => res.json())
        .then(resp => {
          // Log the JSON array directly to the console
          console.log("Data:", resp);
          // Set the movies state with the fetched data
          setMovies(resp);
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
      {}
      <Routes>
        <Route path="/" element= {<Layout/>}>
        <Route path="/" element= {<Home movies={movies}/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
