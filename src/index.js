import React from "react";
import ReactDOM from "react-dom";
import "tailwindcss/tailwind.css";
import "./index.css";
import App from "./App";
import {MapProvider} from "./useContext/useMapContext";

ReactDOM.render(
  <MapProvider>
    <App />
  </MapProvider>,
  document.getElementById("root")
);
