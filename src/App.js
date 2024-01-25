import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import Loader from './components/Loader';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retry,setretry]=useState(true);


  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setretry(true)
    setError(null);
    let success=false
    let count=0
    while(!success && count<3){
    console.log('fetching ....')
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      if (!response.ok) {
        console.log('got error ....')
        throw new Error('Something went wrong!');
      }
  

      console.log('data ....')
      const data = await response.json();
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
      success=true
    } catch (error) {
      setError(error.message);
      console.log(`Error: xxx . Retrying in 5 seconds...`);
      await new Promise(res=>setTimeout(res,5000))
      console.log('restarttttttt')
      count++;
    }
  }
    setIsLoading(false);
  }, []);
  
  useEffect(() => {
    console.log('useeffect....')
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const cancelrequest=()=>{
    console.log('exit....')
    setretry(false)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>{isLoading && <>Loading Movies...</>} {!isLoading && <>Fetch Movies</>}</button>
      </section>
      <section>
      {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found no movies.</p>}
        {isLoading && <Loader/>}
        {error && <span>{error}{retry && <span>...Retrying <button onClick={cancelrequest}>Cancel</button></span>}</span>}
        
      </section>
    </React.Fragment>
  );
}

export default App;
