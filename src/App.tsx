import React, { useState } from "react";
import "../public/app.css";
import Income from "./components/Income";
import Expense from "./components/Expense";
import Saving from "./components/Saving";
import Balance from "./components/Balance";

function App() {
  const [totalIncomeAmount, setTotalIncomeAmount] = useState(0);
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);
  const [totalSavingAmount, setTotalSavingAmount] = useState(0);

  const getTotalIncomeAmount = (totalIncomeAmount: number) => {
    setTotalIncomeAmount(totalIncomeAmount);
  };

  const getTotalExpenseAmount = (totalExpenseAmount: number) => {
    setTotalExpenseAmount(totalExpenseAmount);
  };

  const getTransferAmount = (totalSavingAmount: number) => {
    setTotalSavingAmount(totalSavingAmount);
  };

    const totalBalance = () => {
      return totalIncomeAmount - totalExpenseAmount - totalSavingAmount;
    };

  return (
    <div className="App">
      <Income setTotalIncomeAmount={getTotalIncomeAmount} />
      <br />
      <Expense setTotalExpenseAmount={getTotalExpenseAmount} />
      <br />
      <Saving savingAmount={totalSavingAmount} />
      <br />
      <Balance balance={totalBalance()} transferSaving={getTransferAmount} />
    </div>
  );
}


export default App;
