import { useState, useEffect, useRef } from "react"
import Search from "./components/Search.jsx"
import Loader from "./components/Loader.jsx"
import MovieCard from "./components/MovieCard.jsx";
import { IMAGE_SERVER_BASE_URL } from "./components/MovieCard.jsx";
import { useDebounce } from "use-debounce";
import { updateSearchCount, getTrendingMovies } from "./TrendingMovies.js" 

const MOVIE_API_BASE_URL = "https://api.themoviedb.org/3";
const MOVIE_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const DEFAULT_MOVIES = [
  {
    title: "Oppenheimer",
    poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    search_count: 5,
    id: 872585,
    vote_average: 8.03,
    release_date: "2023-01-01"
  },
  {
    title: "Avengers: Endgame",
    poster_path: "/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg",
    search_count: 4,
    id: 299534,
    vote_average: 8.20,
    release_date: "2019-01-01"
  },
  {
    title: "12 Angry Men",
    poster_path: "/zhG3vKWyDRaZYoaww1UVAi29T9h.jpg",
    search_count: 3,
    id: 389,
    vote_average: 8.56,
    release_date: "1957-01-01"
  },
  {
    title: "Spider-Man: Across the Spider-Verse",
    poster_path: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    search_count: 2,
    id: 569094,
    vote_average: 8.34,
    release_date: "2023-01-01"
  },
  {
    title: "Fight Club",
    poster_path: "/jSziioSwPVrOy9Yow3XhWIBDjq1.jpg",
    search_count: 1,
    id: 550,
    vote_average: 8.40,
    release_date: "1999-01-01"
  }
]
export const NUM_TRENDING_MOVIES = 5;

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
  const [movieList, setMovieList] = useState(DEFAULT_MOVIES);
  const [isLoading, setIsLoading] = useState(true);
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [trendingList, setTrendingList] = useState(DEFAULT_MOVIES);
  const [firstRun, setFirstRun] = useState(true);

  const defaultErrorMsg = "Failed to fetch movies.";
  const isFirstRender = useRef(true);

  const fetchMovies = async (query = "") => {
    if (query === "")
    {
      if (firstRun)
      {
        setFirstRun(false);
      } else {
        return ;
      }
    }

    try{
      const endpoint = query ?
      `${MOVIE_API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : 
      `${MOVIE_API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        setErrorMsg(defaultErrorMsg);
        throw new Error(defaultErrorMsg);
      } 

      const data = await response.json();
      
      if (data.Response === "False")
      {
        setErrorMsg(data.Error || defaultErrorMsg);
        return;
      }

      setErrorMsg("");
      setMovieList(data.results);

    } catch (e) {
      setErrorMsg(`${e}`);
      console.error(`Error fetching movies: ${e}`);
      setMovieList(DEFAULT_MOVIES);
      setTrendingList(DEFAULT_MOVIES);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearch); 
  }, [debouncedSearch]);

  useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      async function updateSearch() {
        const {id, title, poster_path } = movieList[0];
        await updateSearchCount(id, title, poster_path);
      }
      async function fetchTrending() {
        let trending = await getTrendingMovies();
        return (trending?.size > 0) ? trending.docs.map(doc_snap => doc_snap.data()) : trendingList;
      }

      async function updateData()
      {
        if (movieList.length >= 1) {  
          await updateSearch();
          const new_trending = await fetchTrending();
          setTrendingList(new_trending);
      }
    }
    updateData();
  }, [movieList]);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img
            src="./hero.png"
            alt="The landing page hero image, which consists of the posters for the following movies: DJango, Oppenheimer, and Seven."
          />
          <h1>
            The Only <span className="text-gradient">Movie</span> Library You'll
            Ever Need!
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        {trendingList.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingList.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img
                    src={
                      movie.poster_path
                        ? `${IMAGE_SERVER_BASE_URL}${movie.poster_path}`
                        : "no-movie.png"
                    }
                    alt={movie.title}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}
        {trendingList.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingList.map((movie, index) => {
                <li key={movie.id}>
                  <p>{index + 1}</p>
                  <img
                    src={
                      movie.poster_path
                        ? `${IMAGE_SERVER_BASE_URL}${movie.poster_path}`
                        : "no-movie.png"
                    }
                    alt={movie.title}
                  />
                </li>;
              })}
            </ul>
          </section>
        )}
        <section className="all-movies">
          <h2>Movie List</h2>
          {isLoading ? (
            <Loader />
          ) : errorMsg ? (
            <p className="text-red-500">{errorMsg}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App