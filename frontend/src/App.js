//TSSD REQUEST FORM, for additional modification

import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import NavigationComponent from "./components/Admin/NavigationComponent";
import Admin from "./components/Admin/Admin";
import Dashboard from "./components/Admin/Dashboard";
import Login from "./components/Admin/Login";
import Form from "./components/Form";
import Task from "./components/Admin/Task";
import Summary from "./components/Admin/Summary";
import backgroundImage from "./assets/formbg.png";
import "./index.css";
const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const pageStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100vh",
    margin: "0",
    padding: "0",
  };

  return (
    <Grid container style={pageStyle}>
      {isAdmin && (
        <Grid item xs={3}>
          <NavigationComponent />
        </Grid>
      )}

      <Grid item xs={isAdmin ? 9 : 12}>
        <Routes>
          <Route
            path="/"
            element={!isAdmin ? <Form /> : <Navigate to="/dashboard" />}
          />
          <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />
          <Route
            path="/dashboard"
            element={isAdmin ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin"
            element={isAdmin ? <Admin /> : <Navigate to="/login" />}
          />
          <Route
            path="/task"
            element={isAdmin ? <Task /> : <Navigate to="/login" />}
          />
          <Route
            path="/summary"
            element={isAdmin ? <Summary /> : <Navigate to="/login" />}
          />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </Grid>
    </Grid>
  );
};

export default App;
