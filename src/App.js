
import React from "react";
import { TemperatureProvider } from "./TemperatureContext";
import WeatherApp from "./WeatherApp";

function App() {
  return (
    <TemperatureProvider>
      <WeatherApp />
    </TemperatureProvider>
  );
}

export default App;
