import { Paper, Typography } from "@material-ui/core";
import React from "react";
import Rating from "@material-ui/lab/Rating";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";

const ShowMap = ({ place }) => {
  // console.log(place.longitude);
  // console.log(place.latitude); //sm:block
  return (
    <>
      <div className="md:hidden block">
        <LocationOnOutlinedIcon />
      </div>
      <Paper className="md:flex p-2 flex-col relative cursor-pointer h-30 w-28 hidden z-0 hover:z-30 transition duration-500 ease-in-out transform hover:scale-110">
        <Typography variant="body2">{place.name}</Typography>
        <img
          className="h-20 w-100 rounded-lg"
          src={place.photo ? place.photo.images.large.url : "./photo.jpg"}
          alt={place.name}
        />
        <Rating size="small" value={Number(place.rating)} readOnly />
      </Paper>
    </>
  );
};

export default ShowMap;
