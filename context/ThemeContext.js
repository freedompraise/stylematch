import { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [sideNavMode, setSideNavMode] = useState("default");

  const toggleSideNavMode = () => {
    setSideNavMode((prevMode) => (prevMode === "sm" ? "default" : "sm"));
  };

  return (
    <ThemeContext.Provider value={{ sideNavMode, toggleSideNavMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
