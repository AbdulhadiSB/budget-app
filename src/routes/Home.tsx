import React from "react";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  () => navigate("/Budget-app");

  return (
    <div className="home">
      <h1 className="home-title">Smart Money, Smarter Choices</h1>
      <h2 className="sec-title">Maximize Savings, Minimize Stress!</h2>

      <button className="home-btn" onClick={() => navigate("/Budget-app")}>
        Start Saving
      </button>
    </div>
  );
};

export default Home;
