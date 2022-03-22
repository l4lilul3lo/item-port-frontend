import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import Home from "./routes/home";
import Loading from "./components/loading/Loading";
import AuthNav from "./components/nav/AuthNav";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

const Login = React.lazy(() => import("./routes/login"));
const Register = React.lazy(() => import("./routes/register"));
const Account = React.lazy(() => import("./routes/account"));
const Product = React.lazy(() => import("./routes/product"));
const Cart = React.lazy(() => import("./routes/cart"));

document.querySelector(".loader-container").style.display = "none";

function App() {
  //Okay so if we have isAuth in local storage we don't need to do this here. It will be true Then dashboard will render on use and should make a react query call for isAuth and load in the mean time, when the data is ready it will either render the child component or navigate to home.
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer position="bottom-left" pauseOnFocusLoss={false} />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<AuthNav />}>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;

// simplify this now or suffer...
// have a single element that displays a conditional navbar component and a products component. This way only one is updated when it needs to be and not the whole damn thing.
// have Nav bar simply be conditionally rendered based on auth status.

// Path "/" is simply home element. If we listen for auth in the home element, the whole thing will re-render on auth. so we need an authnav that checks for auth instead and renders public nav or private nav appropriately.
