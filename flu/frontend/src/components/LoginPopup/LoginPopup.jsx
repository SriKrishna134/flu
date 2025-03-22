import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPopup = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);

      // Delay navigation to ensure UI updates before redirection
      setTimeout(() => navigate("/survey"), 100);
    } else {
      alert(response.data.message);
    }
  };

  const handleToggleState = () => {
    console.log("Before Click:", currState);
    setCurrState((prev) => (prev === "Login" ? "Sign Up" : "Login"));
  };

  return (
    <div className="login-popup">
      <div className="login-popup-container">
        <div className="login-popup-left">
          <img src="/sign.png" alt="side-img" />
        </div>
        <div className="login-popup-right">
          <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
          </div>
          <p className="login-popup-subtitle">Please login to continue to your account.</p>
          <form onSubmit={onLogin}>
            {currState === "Sign Up" && (
              <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Your name" required />
            )}
            <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email" required />
            <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required />
            <div className="remember-me">
              <input type="checkbox" />
              <label>Keep me logged in</label>
            </div>
            <button type="submit">{currState === "Sign Up" ? "Create account" : "Sign in"}</button>
          </form>

          <p>
            {currState === "Login" ? "Create a new account? " : "Already have an account? "}
            <span onClick={() => {
    console.log("Clicked!");
    setCurrState(currState === "Login" ? "Sign Up" : "Login");
}}>
    Click Here
</span>

          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
