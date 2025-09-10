import { createContext, useState } from "react";

export const TemperatureContext = createContext();

export const TemperatureProvider = ({ children }) => {
  const [unit, setUnit] = useState("C"); // "C" or "F"

  const toggleUnit = () =>
    setUnit((prev) => (prev === "C" ? "F" : "C"));

  return (
    <TemperatureContext.Provider value={{ unit, toggleUnit }}>
      {children}
    </TemperatureContext.Provider>
  );
};
