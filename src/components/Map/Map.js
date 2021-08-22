import React from "react";
import GoogleMapReact from "google-map-react";
import useMapContext from "../../useContext/useMapContext";
import ShowMap from "./ShowMap";

//https://stackoverflow.com/questions/64200660/react-with-google-maps-api-how-to-recenter-map
//https://github.com/google-map-react/google-map-react/issues/1016
// google map styling: https://snazzymaps.com

const Map = () => {
  const {
    coordinates,
    filteredPlaces,
    setCoordinates,
    setBounds,
    setIsChildClicked,
  } = useMapContext();

  const showMap =
    filteredPlaces.length > 0 &&
    filteredPlaces.map((place, i) => (
      <ShowMap
        lng={place.longitude ? +place.longitude : 0}
        lat={place.latitude ? +place.latitude : 0}
        key={i}
        place={place}
      />
    ));
  return (
    <div className="h-screen w-full">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAP_API,
          libraries: ["places"],
          id: "CUSTOM_SCRIPT_ID",
        }}
        // defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={16}
        margin={[50, 50, 50, 50]}
        // options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onChildClick={(child) => {
          // console.log(child);
          setIsChildClicked(child);
        }}
        onChange={(e) => {
          // console.log(e);
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
      >
        {showMap}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
