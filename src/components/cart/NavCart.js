import { useState } from "react";
import { selectCartCount } from "../../features/cartSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const NavCart = () => {
  const navigate = useNavigate();
  const count = useSelector(selectCartCount);
  return (
    <div
      id="nav-cart"
      style={{ cursor: "pointer" }}
      onClick={() => navigate("/cart")}
    >
      <i
        className="bi bi-cart"
        style={{
          fontSize: 30,
          color: "white",
        }}
      />
      <p id="nav-cart-count">{count}</p>
    </div>
  );
};

export default NavCart;
