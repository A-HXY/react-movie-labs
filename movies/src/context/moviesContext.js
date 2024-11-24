import React, { useState, useEffect } from "react";
import { getFavouriteMovies } from '../api/tmdb-api';
import { getWatchlistMovies } from '../api/tmdb-api';
import { toggleFavorite } from '../api/tmdb-api';
import { toggleWatchlist } from '../api/tmdb-api';

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} ) 
  const [mustWatch, setMustWatch] = useState( [] )

  const addToFavorites = (movie) => {
    const sessionId = sessionStorage.getItem("sessionId");
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
    }
    else{
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
    toggleFavorite(sessionId, movie.id, true)
    .catch((error) => console.error("Error adding to favorites:", error));
  };
  
  useEffect(() => {
    const sessionId = sessionStorage.getItem("sessionId");
    const fetchFavoriteMovies = async () => {
      try {
        const data = await getFavouriteMovies(sessionId);
        const movieIds = data.results.map(movie => movie.id);
        setFavorites(movieIds);
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
      }
    };
    fetchFavoriteMovies();
  }, []);

  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };

  const addToWatchlist = (movie) => {
    const sessionId = sessionStorage.getItem("sessionId");
    if (!mustWatch.includes(movie.id)) {
      setMustWatch([...mustWatch, movie.id]);
      toggleWatchlist(sessionId, movie.id, true)
        .catch((error) => console.error("Error adding to watchlist:", error));
    }
  };
  

  useEffect(() => {
    const sessionId = sessionStorage.getItem("sessionId");
    const fetchWatchlistMovies = async () => {
      try {
        const data = await getWatchlistMovies(sessionId);
        const movieIds = data.results.map(movie => movie.id);
        setMustWatch(movieIds);
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
      }
    };
    fetchWatchlistMovies();
  }, []);

    const removeFromWatchlist = (movie) => {
      const sessionId = sessionStorage.getItem("sessionId");
      setMustWatch( mustWatch.filter(
        (mId) => mId !== movie.id
      ) )
      toggleWatchlist(sessionId, movie.id, false)
        .catch((error) => console.error("Error removing from watchlist:", error))
    };

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };
  //console.log(myReviews);

  const addToMustWatch = (movie) => {
    let newMustWatch = [];
    if (!mustWatch.includes(movie.id)){
      newMustWatch = [...mustWatch, movie.id];
    }
    else{
      newMustWatch = [...mustWatch];
    }
    setMustWatch(newMustWatch);
    console.log("Must Watch list:", mustWatch);
  };

 return (
    <MoviesContext.Provider
      value={{
        favorites,
        mustWatch,
        addToFavorites,
        removeFromFavorites,
        addToWatchlist,
        removeFromWatchlist,
        addReview,
        addToMustWatch,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;