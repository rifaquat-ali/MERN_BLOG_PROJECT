import { Link } from "react-router-dom";
import React from "react";
import logo from "../../icons/profile.png";
import "../../App.css";

const Header = ({ isLoggedIn }) => {
  return (
    <>
      <div className="w-100 bg-secondary d-flex justify-content-between py-2 px-3 bg-light nav_txt">
        <img
          src={logo}
          alt="logo"
          style={{
            height: "50px",
            width: "50px",
          }}
        />
        <div className="d-flex justify-content-evenly pt-2">
          <Link className="text-decoration-none btn nav_txt_color" to="/home">
            Home
          </Link>
          <Link className="text-decoration-none btn nav_txt_color" to="/about">
            About
          </Link>
          <Link
            className="text-decoration-none btn nav_txt_color"
            to="/contact"
          >
            Contact
          </Link>
          <Link className="text-decoration-none btn nav_txt_color" to="/login">
            Logout
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
