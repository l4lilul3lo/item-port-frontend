import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import { selectIsAuth } from "./features/userSlice";

import Home from "./routes/home/Home";
import Loading from "./components/loading/Loading";
import PageLayout from "./components/pagelayout/PageLayout";
const Login = React.lazy(() => import("./routes/login/Login"));
const Register = React.lazy(() => import("./routes/register/Register"));
const Dashboard = React.lazy(() => import("./routes/dashboard/Dashboard"));
const ProtectedRoute = React.lazy(() =>
  import("./routes/protectedroute/ProtectedRoute")
);
// const Dashboard = React.lazy(() => import("./routes/dashboard/Dashboard"));
document.querySelector(".loader-container").style.display = "none";

function App() {
  const isAuth = useSelector(selectIsAuth);

  //Okay so if we have isAuth in local storage we don't need to do this here. It will be true Then dashboard will render on use and should make a react query call for isAuth and load in the mean time, when the data is ready it will either render the child component or navigate to home.
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer position="bottom-left" pauseOnFocusLoss={false} />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route
              path="/"
              element={
                isAuth ? <Navigate to="/dashboard" /> : <Navigate to="/home" />
              }
            />
            <Route element={<PageLayout />}>
              <Route path="/home" element={<Home />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;

// app renders and path relocate is matched. and then initial Auth is called. Relocate depends on it so it re-renders relocate.
