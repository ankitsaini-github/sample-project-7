import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import Loader from './components/Loader';
import AddMovie from './components/AddMovie';

const URL='https://react-http-2265-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retry,setretry]=useState(true);


  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setretry(true)
    setError(null);
    // let success=false
    // let count=0
    // while(!success && count<3){
    console.log('fetching ....')
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        console.log('got error ....')
        throw new Error('Something went wrong!');
      }
  

      const data = await response.json();
      
      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      setMovies(loadedMovies);
      // success=true

    } catch (error) {
      setError(error.message);
      // await new Promise(res=>setTimeout(res,5000))
      // count++;
    }
  // }
    setIsLoading(false);
  }, []);
  
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const cancelrequest=()=>{
    setretry(false)
  }

  async function addMovieHandler(movie) {
    console.log('sending post req...');
    const response = await fetch(URL,{
      method:'POST',
      body: JSON.stringify(movie),
      headers:{
        'Content-Type' : 'application/json'
      }
    })
    const data = await response.json();
    console.log('added : ',data);
  }
  
  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
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
