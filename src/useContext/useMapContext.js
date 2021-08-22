import { useContext, useEffect, useState, createContext } from "react";
import axios from "axios";

const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [coordinates, setCoordinates] = useState();
  const [bounds, setBounds] = useState(null);
  const [places, setPlaces] = useState([]);
  const [type, setType] = useState("restaurants");
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0); //""All
  const [isChildClicked, setIsChildClicked] = useState(null);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    // if ("geolocation" in navigator) {
    // check if geolocation is supported/enabled on current browser
    navigator.geolocation.getCurrentPosition((position) =>
      setCoordinates({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    );
    // } else {
    //   setCoordinates({ lat: 10.79161710000001, lng: 106.68558789999997 });
    // }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const getPlaces = async (bounds) => {
      try {
        const {
          data: { data },
        } = await axios.get(
          `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
          {
            params: {
              // bl_latitude: "11.847676",
              // tr_latitude: "12.838442",
              // bl_longitude: "109.095887",
              // tr_longitude: "109.149359",
              bl_latitude: bounds.sw.lat,
              tr_latitude: bounds.ne.lat,
              bl_longitude: bounds.sw.lng,
              tr_longitude: bounds.ne.lng,
            },
            headers: {
              "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
              "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
            },
          }
        );
        //   console.log(data);
        setIsLoading(false);
        setPlaces(data);
        // setFilteredPlaces(data)
        // setFilteredPlaces([])
        // setRating("")
      } catch (error) {
        console.log(error);
      }
    };
    if (bounds) {
      getPlaces(bounds);
    }
  }, [bounds, type]);

  useEffect(() => {
    const filtered = places?.filter((place) => Number(place.rating) > rating);
    setFilteredPlaces(filtered);
  }, [rating, places]);

  return (
    <MapContext.Provider
      value={{
        bounds,
        setBounds,
        places,
        setPlaces,
        coordinates,
        setCoordinates,
        setType,
        type,
        isLoading,
        rating,
        setRating,
        isChildClicked,
        setIsChildClicked,
        filteredPlaces,
        setFilteredPlaces,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

const useMapContext = () => useContext(MapContext);
export default useMapContext;
