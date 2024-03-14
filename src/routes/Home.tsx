import React from "react";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  () => navigate("/Budget-app");

  return (
    <div className="home">
      <button className="home-btn" onClick={() => navigate("/Budget-app")}>
        {" "}
        Home{" "}
      </button>
    </div>
  );
};

export default Home;
