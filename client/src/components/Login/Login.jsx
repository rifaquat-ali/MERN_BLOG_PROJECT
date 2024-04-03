import React, { useState, useContext } from "react";
import { TextField } from "@mui/material";
import { API } from "../../webServices/api-interceptor";
import "../../App.css";
import { StoreContext } from "../../context/StoreContextComp";
import { useNavigate } from "react-router-dom";
import logo from "../../icons/profile.png";

const Login = (props) => {
  const [signupData, setSignupData] = useState({});
  const [loginData, setLoginData] = useState({});
  const [showCont, setShowCont] = useState("login");
  const [isError, setIsError] = useState(false);

  const { setUserDetails } = useContext(StoreContext);
  const goToPage = useNavigate();

  //handle login and signup
  const handleClick = async () => {
    if (showCont === "signup") {
      try {
        //! signup api
        let response = await API.signup(signupData);
        if (response.isSuccess) {
          setShowCont("login");
        } else {
          setIsError(true);
          console.log("error>>isSuccess :", response);
        }
      } catch (e) {
        console.log("Error: Signup CLIENT", e);
      }
    } else {
      //! login api
      // axios.post("http://localhost:8000/login",loginData)
      try {
        let response = await API.login(loginData);
        if (response.isSuccess) {
          console.log("response sucess >>>", response);
          sessionStorage.setItem(
            "accessToken",
            `Bearer ${response.data.accessToken}`
          );
          sessionStorage.setItem(
            "refreshToken",
            `Bearer ${response.data.refreshToken}`
          );
          setUserDetails({
            username: response.data.username,
            name: response.data.name,
          });
          props.setIsLoggedIn(true); //setting login true
          goToPage("/");
        }
      } catch (error) {
        console.log(error, "error login");
        setIsError(true);
      }
    }
  };

  // handle toggle of singup and login
  const handleToggle = () => {
    if (showCont === "login") {
      setShowCont("signup");
    } else {
      setShowCont("login");
    }
  };

  //text field change for login
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  //text fields onChange signup
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };
  return (
    <div
      id="login-main"
      className="container-fluid d-flex vh-100"
      style={{
        background: "linear-gradient(101.83deg, #7D30A1 9.43%, #C586FF 99.34%)",
      }}
    >
      <div className="container d-flex justify-content-center align-items-center">
        <div
          id="innerBox"
          className="p-4 rounded border-light col-lg-4 col-md-6 col-sm-12"
        >
          <img
            src={logo}
            alt="icon"
            style={{
              height: "50px",
              width: "50px",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <div className="p-3">
            <p className="text-center p-2 text-dark h3">
              {showCont === "signup" ? "Signup Here" : "Login Here"}
            </p>
            <p className="text-center text-muted">
              {showCont === "signup" ? "Already a member ?" : "Not a member ?"}{" "}
              <button
                style={{
                  color: "#26b3a3",
                }}
                className="btn fw-bold btn-outline-none"
                onClick={handleToggle}
              >
                {showCont === "signup" ? "Please Login" : "Sign Up Now"}
              </button>
            </p>
          </div>
          {showCont === "login" ? (
            <div id="loginForm" className="d-flex flex-column">
              <TextField
                name="username"
                color="warning"
                id="outlined-basic"
                label="Username"
                variant="outlined"
                onChange={(e) => handleLoginChange(e)}
              />
              <TextField
                name="password"
                color="warning"
                className="mt-3"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                onChange={(e) => handleLoginChange(e)}
              />{" "}
              <p className="text-danger">
                {isError && "Please check all fields !"}
              </p>
            </div>
          ) : (
            //signup form fields
            <div id="signupForm" className="d-flex flex-column">
              <TextField
                name="username"
                color="warning"
                id="outlined-basic"
                label="Username"
                variant="outlined"
                onChange={(e) => handleSignupChange(e)}
              />
              <TextField
                className="mt-3"
                name="name"
                color="warning"
                id="outlined-basic"
                label="Name"
                variant="outlined"
                onChange={(e) => handleSignupChange(e)}
              />
              <TextField
                name="password"
                color="warning"
                className="mt-3"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                onChange={(e) => handleSignupChange(e)}
              />{" "}
              <p className="text-danger">
                {isError && "Please check all fields !"}
              </p>
            </div>
          )}
          <div className="bottom-container">
            <div className="mt-3  d-flex justify-content-around">
              <button
                id="authenticate-btn"
                onClick={handleClick}
                className="btn text-light px-5"
                style={{
                  background: "#26b3a3",
                }}
              >
                {showCont === "signup" ? "Register" : "Login"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
