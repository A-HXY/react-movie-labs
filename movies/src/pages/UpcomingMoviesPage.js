import React from "react";
import { useQuery } from "react-query";
import { getUpcomingMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import MovieList from "../components/movieList";
import PageTemplate from "../components/templateMoviePage";

const UpcomingMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery("upcomingMovies", getUpcomingMovies);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <PageTemplate title="Upcoming Movies">
      <MovieList movies={data.results} /> {
      }
    </PageTemplate>
  );
};

export default UpcomingMoviesPage;
