import React from "react";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  () => navigate("/budget-app");

  return <button onClick={() => navigate("/budget-app")}> Home </button>;
};

export default Home;
