import { AppBar, Box, InputBase, Typography } from "@material-ui/core";
import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Autocomplete } from "@react-google-maps/api";
import useMapContext from "../useContext/useMapContext";

//https://react-google-maps-api-docs.netlify.app/#autocomplete
//https://www.npmjs.com/package/@react-google-maps/api
//https://stackoverflow.com/questions/64796511/stoppropagation-react-google-maps-autocomplete

const Header = () => {
  const { setCoordinates } = useMapContext();
  const [autocomplete, setAutocomplete] = useState(null);
  const onLoad = (auto) => {
    setAutocomplete(auto);
  };
  //https://react-google-maps-api-docs.netlify.app/#autocomplete
  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      // console.log(autocomplete.getPlace());
      const lat = autocomplete.getPlace().geometry.location.lat();
      const lng = autocomplete.getPlace().geometry.location.lng();
      setCoordinates({ lat, lng });
    }
  };
  return (
    <AppBar position="sticky">
      <div className="flex md:h-14 sm:h-auto items-center justify-between p-5">
        <Typography className="text-lg" variant="h6">
          Travel Advisor
        </Typography>
        <Box display="flex">
          <Typography className="text-lg" variant="h6">
            Explore new places
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className="ml-4 rounded-full flex justify-center items-center py-4 sm:py-0 border-white border-2 border-opacity-25">
              <SearchIcon />
              <InputBase placeholder="Search..." />
            </div>
          </Autocomplete>
        </Box>
      </div>
    </AppBar>
  );
};

export default Header;
