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
const Email = React.lazy(() => import("./routes/email"));
const VerificationStatus = React.lazy(() =>
  import("./routes/verificationStatus")
);

document.querySelector(".loader-container").style.display = "none";

function App() {
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
            <Route path="/email" element={<Email />} />
            <Route
              path="/verificationStatus"
              element={<VerificationStatus />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
