import { useState, useEffect } from "react"
import Search from "./components/Search.jsx"
import Loader from "./components/Loader.jsx"
import MovieCard from "./components/MovieCard.jsx";
import "use-debounce"
import { useDebounce } from "use-debounce";

const MOVIE_API_BASE_URL = "https://api.themoviedb.org/3";
const MOVIE_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${MOVIE_API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const defaultErrorMsg = "Failed to fetch movies.";

  const fetchMovies = async (query = "") => {
    try{
      const endpoint = query ?
      `${MOVIE_API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : 
      `${MOVIE_API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error(defaultErrorMsg);
      } 

      const data = await response.json();
      
      if (data.Response === "False")
      {
        setErrorMsg(data.Error || defaultErrorMsg);
        setMovieList([]);

        return;
      }

      setErrorMsg("");
      setMovieList(data.results || []);

    } catch (e) {
      setErrorMsg(`${e}`);
      console.error(`Error fetching movies: ${e}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearch);
  }, [debouncedSearch]);

  return (  
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="The landing page hero image, which consists of the posters for the following movies: DJango, Oppenheimer, and Seven." />
          <h1>
            Your One-Stop Shop for All Things <span className="text-gradient">Movies</span>!
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>
        <section className="all-movies">
          <h2 className="mt-5">Movie List</h2>
          {isLoading ? (<Loader />)
          : errorMsg ? (<p className="text-red-500">{errorMsg}</p>)
          : (
            <ul>
              { movieList.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App