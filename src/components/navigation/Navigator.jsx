import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../views/home/Home";
import LoginView from "../../views/login/LoginView";
import { RequireAuth } from "react-auth-kit";

const Navigator = () => {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <RequireAuth loginPath="/connexion">
            <Home />
          </RequireAuth>
        }
      />
      <Route path="/connexion" element={<LoginView />} />
    </Routes>
  );
};

export default Navigator;
