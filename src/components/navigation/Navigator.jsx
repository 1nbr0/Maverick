import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../views/home/Home";
import LoginView from "../../views/login/LoginView";
import CreateView from "../../views/crud/plane/CreateView";
import DetailView from "../../views/crud/plane/DetailView";
import EditView from "../../views/crud/plane/EditView";
import PrivateRoutes from "./PrivateRoutes";
import CreateFlightScheduleView from "../../views/crud/flightSchedule/CreateFlightScheduleView";
import DetailFlightScheduleView from "../../views/crud/flightSchedule/DetailFlightScheduleView";

const Navigator = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Home />} exact />
        <Route path="/nouvel-avion" element={<CreateView />} />
        <Route
          path="/nouveau-plan-de-vol"
          element={<CreateFlightScheduleView />}
        />
        <Route path="/plan-de-vol/:id" element={<DetailFlightScheduleView />} />
        <Route path="/avion/edition/:id" element={<EditView />} />
        <Route path="/avion/:id" element={<DetailView />} />
      </Route>
      <Route path="/connexion" element={<LoginView />} />
    </Routes>
  );
};

export default Navigator;
