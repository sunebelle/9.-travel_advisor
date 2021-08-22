import React, { createRef, useEffect, useState } from "react";
import PlaceDetails from "./PlaceDetails";
import {
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import useMapContext from "../useContext/useMapContext";

const List = () => {
  const [childRef, setChildRef] = useState([]);
  const {
    type,
    setType,
    // places,
    isLoading,
    isChildClicked,
    rating,
    setRating,
    filteredPlaces,
  } = useMapContext();
  // console.log({ isChildClicked });

  useEffect(() => {
    setChildRef((ref) =>
      Array(filteredPlaces.length)
        .fill()
        .map((_, i) => ref[i] || createRef())
    );
  }, [filteredPlaces]);

  return (
    <div className="bg-white w-100">
      <Typography variant="h6" className="text-sx font-medium mb-4">
        Discover many places around you
      </Typography>
      {isLoading ? (
        <div className="flex justify-center items-center h-80 ">
          <CircularProgress size="3rem" />
        </div>
      ) : (
        <>
          <div className="text-xs leading-3 my-4">
            <FormControl
              variant="outlined"
              className="w-2/4 text-xs leading-3 "
            >
              <InputLabel>Type</InputLabel>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value)}
                label="restaurants"
              >
                <MenuItem value="restaurants">Restaurants</MenuItem>
                <MenuItem value="hotels">Hotels</MenuItem>
                <MenuItem value="attractions">Attractions</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              variant="outlined"
              className="w-2/4 text-xs leading-3 "
            >
              <InputLabel>Ranking</InputLabel>
              <Select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                label="alllllllllll"
              >
                <MenuItem value="0">All</MenuItem>
                <MenuItem value="3">Above 3.0</MenuItem>
                <MenuItem value="4">Above 4.0</MenuItem>
                <MenuItem value="4.5">Above 4.5</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Grid container className="overflow-y-auto h-screen overscroll-auto">
            {filteredPlaces.length > 0 &&
              filteredPlaces.map((place, i) => (
                <Grid ref={childRef[i]} key={i} item xs={12}>
                  <PlaceDetails
                    refProps={childRef[i]}
                    isClicked={Number(isChildClicked) === i}
                    place={place}
                  />
                </Grid>
              ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
