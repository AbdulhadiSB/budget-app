import React from "react";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  () => navigate("/Budget-app");

  return <button onClick={() => navigate("/Budget-app")}> Home </button>;
};

export default Home;
