const IMAGE_SERVER_BASE_URL = "https://image.tmdb.org/t/p/w500/";

const MovieCard = ({
  movie: { original_language, poster_path, release_date, title, vote_average },
}) => {
  return (
    <div className="movie-card">
        <img
/*           src={
            poster_path
              ? `${IMAGE_SERVER_BASE_URL}${poster_path}`
              : "no-movie.png"
          } */
             src="no-movie.png"
          alt={title}
        />
        <div className="mt-4">
          <h3>{title}</h3>
          <div className="content">
            <div className="rating text-white">
                <img src="star.svg" alt="Star icon" />
                <p>{ vote_average ? vote_average.toFixed(2) : "N/A"}</p>
                <span>⋅</span>
                <p className="lang">{original_language ? original_language : "En"}</p>
                <span>⋅</span>
                <p className="year">{release_date ? release_date.split('-')[0] : "N/A"}</p>
            </div>
          </div>
        </div>
    </div>
  );
};

export default MovieCard;
