import { BrowserRouter, Route, Routes } from "react-router-dom";

import BudgetApp from "./routes/Budget-app";
import Home from "./routes/Home";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/budget-app" element={<BudgetApp />} />
      </Routes>
    </BrowserRouter>
  );
}