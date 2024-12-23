import React, { useContext } from "react";
import { MoviesContext } from "../../context/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Card } from "@mui/material";

const AddToPlaylistIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleAddToPlaylist = (e) => {
    e.preventDefault();
    context.addToMustWatch(movie);
  };


  return (
        <IconButton aria-label="add to playlist" onClick={handleAddToPlaylist}>
        <PlaylistAddIcon sx={{ fontSize: 24, color: 'primary.main' }} />
        </IconButton>
  );
};

export default AddToPlaylistIcon;