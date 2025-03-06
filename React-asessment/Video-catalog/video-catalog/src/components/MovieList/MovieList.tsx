import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, setSearchQuery, setPage, setType } from "../../features/movie/movieslice";
import { RootState, AppDispatch } from "../../store";
import "./MovieList.css";
import { useSearchParams } from "react-router-dom";
import Loading from "../common/Loading/Loading";
import Pagination from "../common/Pagination/Pagination";
import { ErrorAlert } from "../common/ErrorAlert/errorAlert";
import { getMovieDetails } from "../../services/Movies";
import { IMovie } from "../../models/IMovie";



const MovieList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, totalResults, loading, error, searchQuery } = useSelector(
    (state: RootState) => state.movies
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const urlPage = Number(searchParams.get("page") || "1");
  const category = searchParams.get("category") || "";

  // Local state for the selected movie details (full information)
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);
  // State to control if the Plot text is expanded or not
  const [plotExpanded, setPlotExpanded] = useState(false);

  useEffect(() => {
    dispatch(setPage(urlPage));
    dispatch(setType(category));
    dispatch(fetchMovies({ searchQuery, page: urlPage, type: category }));
  }, [dispatch, searchQuery, urlPage, category]);

  const rowsPerPage = 10;
  const totalPages = Math.ceil(totalResults / rowsPerPage);

  const next = (newPage: number) => setSearchParams({ page: newPage.toString(), category });
  const previous = (newPage: number) => setSearchParams({ page: newPage.toString(), category });
  const selectPage = (selectedPage: number) =>
    setSearchParams({ page: selectedPage.toString(), category });

  const disableNext = urlPage * rowsPerPage >= totalResults;
  const disablePrevious = urlPage === 1;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchKey = event.target.value;
    dispatch(setSearchQuery(newSearchKey));
    setSearchParams({ page: "1", category });
  };

  const handleTypeChange = (newType: string) => {
    dispatch(setType(newType));
    setSearchParams({ page: "1", category: newType });
  };

  const startResultNumber = totalResults > 0 ? (urlPage - 1) * rowsPerPage + 1 : 0;
  const endResultNumber = (urlPage - 1) * rowsPerPage + movies.length;

  // When clicking on the movie title, fetch full movie details using imdbID
  const handleTitleClick = async (movie: IMovie) => {
    try {
      const details = await getMovieDetails(movie.imdbID);
      setSelectedMovie(details);
      setPlotExpanded(false);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  // Close the popup card and reset plot expansion
  const closeDetails = () => {
    setSelectedMovie(null);
    setPlotExpanded(false);
  };

  return (
    <div className="container">
      <h1>Video Catalog</h1>
      <div className="movie-controls">
        <div className="pagination-wrapper">
          <Pagination
            key={`pagination-${urlPage}`}
            page={urlPage}
            totalPages={totalPages}
            onPrevious={previous}
            onNext={next}
            onPageSelect={selectPage}
            disablePrevious={disablePrevious}
            disableNext={disableNext}
          />
        </div>
        <div className="search-wrapper">
          <input
            type="search"
            className="form-control"
            placeholder="Type to search by Title"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="btn-group-wrapper">
          <div className="btn-group" role="group" aria-label="Filter by category">
            <button className="btn btn-primary" onClick={() => handleTypeChange("")}>
              ANY
            </button>
            <button className="btn btn-danger" onClick={() => handleTypeChange("movie")}>
              Movies
            </button>
            <button className="btn btn-warning" onClick={() => handleTypeChange("series")}>
              Series
            </button>
            <button className="btn btn-success" onClick={() => handleTypeChange("episode")}>
              Episodes
            </button>
          </div>
        </div>
      </div>
      <div className="mb-3">
        {totalResults > 0 ? (
          <span>
            Showing {startResultNumber} to {endResultNumber} of {totalResults} result
            {totalResults !== 1 ? "s" : ""}
          </span>
        ) : (
          <span>No results found.</span>
        )}
      </div>
      {!loading && error && <ErrorAlert error={new Error(error)} />}
      {loading && <Loading />}
      <table className="movie-table">
        <thead>
          <tr>
            <th>Poster</th>
            <th>Title</th>
            <th>Year</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, index) => (
            <tr key={index}>
              <td>
                <img src={movie.Poster} alt={movie.Title} className="table-poster" />
              </td>
              <td>
                <span
                  className="movie-title clickable"
                  onClick={() => handleTitleClick(movie)}
                >
                  {movie.Title}
                </span>
              </td>
              <td>{movie.Year}</td>
              <td>
                <button className="btn btn-primary btn-sm tiny-btn my-1">{movie.Type}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedMovie && (
        <div className="movie-details-card">
          <div className="card-header">
            <h2>{selectedMovie.Title}</h2>
            <button className="close-btn" onClick={closeDetails}>
              X
            </button>
          </div>
          <div className="card-body">
            <div className="poster-section">
              <img
                src={selectedMovie.Poster}
                alt={selectedMovie.Title}
                className="details-poster"
              />
            </div>
            <div className="info-section">
              <p>
                <strong>Year:</strong> {selectedMovie.Year}
              </p>
              <p>
                <strong>Rated:</strong> {selectedMovie.Rated}
              </p>
              <p>
                <strong>Released:</strong> {selectedMovie.Released}
              </p>
              <p>
                <strong>Runtime:</strong> {selectedMovie.Runtime}
              </p>
              <p>
                <strong>Genre:</strong> {selectedMovie.Genre}
              </p>
              <p>
                <strong>Director:</strong> {selectedMovie.Director}
              </p>
              <p>
                <strong>Writer:</strong> {selectedMovie.Writer}
              </p>
              <p>
                <strong>Actors:</strong> {selectedMovie.Actors}
              </p>
              {/* Expandable Plot text */}
              <p className={`expandable ${plotExpanded ? "show-all" : ""}`}>
                <strong>Plot:</strong> {selectedMovie.Plot}
              </p>
              {selectedMovie.Plot.split(" ").length > 20 && (
                <span className="show-more" onClick={() => setPlotExpanded(!plotExpanded)}>
                  {plotExpanded ? "Show less..." : "Show more..."}
                </span>
              )}
              <p>
                <strong>Language:</strong> {selectedMovie.Language}
              </p>
              <p>
                <strong>Country:</strong> {selectedMovie.Country}
              </p>
              <p>
                <strong>Awards:</strong> {selectedMovie.Awards}
              </p>
              <p>
                <strong>Metascore:</strong> {selectedMovie.Metascore}
              </p>
              <p>
                <strong>imdbRating:</strong> {selectedMovie.imdbRating}
              </p>
              {selectedMovie.Ratings && selectedMovie.Ratings.length > 0 && (
                <div className="ratings-section">
                  <p>
                    <strong>Ratings:</strong>
                  </p>
                  <ul>
                    {selectedMovie.Ratings.map((rating, idx) => (
                      <li key={idx}>
                        {rating.Source}: {rating.Value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;
