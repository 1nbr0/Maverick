import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../views/home/Home";
import LoginView from "../../views/login/LoginView";
import { RequireAuth } from "react-auth-kit";
import CreateView from "../../views/crud/plane/CreateView";
import DetailView from "../../views/crud/plane/DetailView";
import EditView from "../../views/crud/plane/EditView";

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
      <Route path="/nouvel-avion" element={<CreateView />} />
      <Route path="/avion/edition/1" element={<EditView />} />
      <Route path="/avion/:id" element={<DetailView />} />
    </Routes>
  );
};

export default Navigator;
