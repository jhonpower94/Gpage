import React, { createContext, useState } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { blue } from "@material-ui/core/colors";
import { Router } from "@reach/router";
import Homepage from "./pages/google";
import EmailPage from "./pages/google/emailinput";
import PasswordPage from "./pages/google/passwordinput";
import logo from "./logo.svg";
import "./App.css";

export const AppContext = createContext();

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      // Purple and green play nicely together.
      main: "#1a73e8",
    },
  },
});

function App() {
  const [loading, setLoading] = useState({
    loading: false,
  });
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  return (
    <AppContext.Provider value={{ loading, data, setData, setLoading }}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Homepage path="/">
              <EmailPage path="/:email" />
              <PasswordPage path="password" />
            </Homepage>
          </Router>
        </div>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
