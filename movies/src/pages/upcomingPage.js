import React from "react";
import { useQuery } from 'react-query';
import { getUpcomingMovies } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import PageTemplate from '../components/templateMovieListPage';
import AddToPlaylist from '../components/cardIcons/addToPlaylist';

const UpcomingPage = (props) => {
  const { data, error, isLoading, isError } = useQuery("upcoming", getUpcomingMovies);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>Error: {error.message}</h1>;
  }
const upcomings = data.results;

const mustWatchs = upcomings.filter(m => m.mustWatch)
localStorage.setItem('must watch', JSON.stringify(mustWatchs))
console.log(mustWatchs)

  return(
    <PageTemplate>
      title='Upcoming Movies'
      movies={upcomings}
      action={(movie) => {
          return <AddToPlaylist movie={movie}/>
      }}

      </PageTemplate>
  )
}

export default UpcomingPage;
