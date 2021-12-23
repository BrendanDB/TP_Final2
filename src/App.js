import React, { useState, Fragment } from "react";
import CSS from "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "./places/Register/Register";
import Login from "./places/Login/Login";
import MainPage from "./places/MainPage/MainPage";

const App = () => {
  console.log("App");
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [token, setToken] = useState("");
  const [adventurer, setAdventurer] = useState({});

  return (
    <Fragment>
      <Routes>
        <Route
          path="/*"
          element={
            token ? <MainPage token={token} /> : <Login token={setToken} />
          }
        />
        <Route
          path="/login"
          element={<Login token={setToken} adventurer={setAdventurer} />}
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Fragment>
  );
};

export default App;
