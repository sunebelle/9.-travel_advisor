import React from "react";
import Header from "./components/Header";
import List from "./components/List";
import Map from "./components/Map/Map";
import { Grid } from "@material-ui/core";

const App = () => {
  return (
    <div className="w-full mx-auto">
      <Header />
      <div className="p-5">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <List />
          </Grid>
          <Grid item xs={12} md={8}>
            <Map />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default App;
