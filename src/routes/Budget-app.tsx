import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router";



import "../../public/app.css";
import Income from "../components/Income";
import Expense from "../components/Expense";
import Saving from "../components/Saving";
import Balance from "../components/Balance";

function BudgetApp() {
  const [totalIncomeAmount, setTotalIncomeAmount] = useState(0);
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);
  const [totalSavingAmount, setTotalSavingAmount] = useState(0);

  const getTotalIncomeAmount = useCallback(
    (totalIncomeAmount: number) => {
      setTotalIncomeAmount(totalIncomeAmount);
    },
    [totalIncomeAmount]
  );

  const getTotalExpenseAmount = useCallback(
    (totalExpenseAmount: number) => {
      setTotalExpenseAmount(totalExpenseAmount);
    },
    [totalExpenseAmount]
  );

  const getTransferAmount = useCallback(
    (totalSavingAmount: number) => {
      setTotalSavingAmount(totalSavingAmount);
    },
    [totalSavingAmount]
  );

  const totalBalance = () => {
    return totalIncomeAmount - totalExpenseAmount - totalSavingAmount;
  };

  const navigate = useNavigate();
  () => navigate("/Home");


  return (
    <div className="App">
      <button className="exit-btn" onClick={() => navigate("/Home")}>
        Exit
      </button>
      <Income setTotalIncomeAmount={getTotalIncomeAmount} />
      <Expense setTotalExpenseAmount={getTotalExpenseAmount} />
      <Saving savingAmount={totalSavingAmount} />
      <Balance balance={totalBalance()} transferSaving={getTransferAmount} />
    </div>
  );
}

export default BudgetApp;
