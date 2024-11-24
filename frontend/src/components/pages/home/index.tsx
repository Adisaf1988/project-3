import React from "react";
import "./home.css";

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <div className="image-container">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
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
              onClick={() =>
                (window.location.href = "http://localhost:5173/register")
              }
            >
              Register
            </button>
            <button
              className="action-button secondary"
              onClick={() =>
                (window.location.href = "http://localhost:5173/login")
              }
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
