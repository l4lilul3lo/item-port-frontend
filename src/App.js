import "./App.css";
import { Link, Outlet, Routes, Route, BrowserRouter } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Home = React.lazy(() => import("./routes/home/Home"));
const Login = React.lazy(() => import("./routes/login/Login"));
const Register = React.lazy(() => import("./routes/register/Register"));
const Dashboard = React.lazy(() => import("./routes/dashboard/Dashboard"));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <React.Suspense fallback={<p>Loaindg page...</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="dashboard" element={<Dashboard />}></Route>
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
