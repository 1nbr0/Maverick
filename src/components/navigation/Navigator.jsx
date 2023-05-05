import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../views/home/Home";
import LoginView from "../../views/login/LoginView";

const Navigator = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/connexion" element={<LoginView />} />
    </Routes>
  );
};

export default Navigator;
