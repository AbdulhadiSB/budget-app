import React, { useState, useCallback } from "react";

import Income from "../components/Income";
import Expense from "../components/Expense";
import Saving from "../components/Saving";
import Balance from "../components/Balance";


function BudgetApp() {
  const [totalIncomeAmount, setTotalIncomeAmount] = useState(0);
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);
  const [totalSavingAmount, setTotalSavingAmount] = useState(0);

  const getTotalIncomeAmount = useCallback((totalIncomeAmount: number) => {
    setTotalIncomeAmount(totalIncomeAmount);
  }, []);

  const getTotalExpenseAmount = useCallback((totalExpenseAmount: number) => {
    setTotalExpenseAmount(totalExpenseAmount);
  }, []);

  const getTransferAmount = useCallback((totalSavingAmount: number) => {
    setTotalSavingAmount(totalSavingAmount);
  }, []);

  const totalBalance = () => {
    return totalIncomeAmount - totalExpenseAmount - totalSavingAmount;
  };

  return (
    <div className="App">
      <Income setTotalIncomeAmount={getTotalIncomeAmount} />
      <Expense setTotalExpenseAmount={getTotalExpenseAmount} />
      <Saving savingAmount={totalSavingAmount} />
      <Balance balance={totalBalance()} transferSaving={getTransferAmount} />
    </div>
  );
}

export default BudgetApp;
