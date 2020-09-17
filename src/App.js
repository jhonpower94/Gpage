import React, { createContext, useState } from "react";
import { Router } from "@reach/router";
import Homepage from "./pages";
import EmailPage from "./pages/emailinput";
import PasswordPage from "./pages/passwordinput";
import logo from "./logo.svg";
import "./App.css";

export const AppContext = createContext();

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
      <div className="App">
        <Router>
          <Homepage path="/">
            <EmailPage path="/" />
            <PasswordPage path="password" />
          </Homepage>
        </Router>
      </div>
    </AppContext.Provider>
  );
}

export default App;
