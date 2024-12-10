import React from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="image-container">
        <img
          src="https://media1.tenor.com/m/eQDuTRTKWDcAAAAd/waves-ocean.gif"
          alt="Exotic Beach"
          className="background-image"
        />
        <div className="overlay">
          <h1 className="title">Welcome to the Vacation World</h1>
          <p className="subtitle">
            Escape to paradise. Explore exotic destinations and create memories
            that will last a lifetime.
          </p>
          <div className="button-container">
            <button
              className="action-button"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
            <button
              className="action-button secondary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
