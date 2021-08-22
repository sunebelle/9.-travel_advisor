import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@material-ui/core";
import React from "react";
import defaultImg from "../assets/photo.jpg";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";

const PlaceDetails = ({ place, isClicked, refProps }) => {
  //https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
  //https://fix.code-error.com/react-class-this-ref-current-scrollintoview-not-scrolling-when-it-should/

  if (isClicked)
    refProps?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <Card>
      <CardMedia
        className="h-60"
        image={place.photo ? place.photo.images.large.url : defaultImg}
        title={place.name}
      />
      <CardContent className="pt-4">
        <Typography variant="h6">{place.name}</Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2">Price</Typography>
          <Typography variant="subtitle2">{place.price}</Typography>
        </Box>
        <Box display="flex items-stretch">
          <Typography variant="subtitle2">{place.ranking}</Typography>
        </Box>
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className="my-2" />
        ))}
        {place.address && (
          <Typography variant="body2" color="textSecondary">
            <LocationOnIcon />
            {place.address}
          </Typography>
        )}
        {place.phone && (
          <Typography
            variant="body2"
            color="textSecondary"
            className="flex justify-between"
          >
            <PhoneIcon /> {place.phone}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => window.open(place.web_url)}>
          Trip Advisor
        </Button>
        <Button size="small" onClick={() => window.open(place.website)}>
          Website
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlaceDetails;
