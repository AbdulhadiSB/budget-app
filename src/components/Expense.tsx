import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

type ExpenseType = {
  id: string;
  source: string;
  amount: number;
  date: string;
};

type GetExpense = {
  setTotalExpenseAmount: (totalExpenseAmount: number) => void;
};

const Expense = (props: GetExpense) => {
  const [expenseArr, setExpenseArr] = useState<ExpenseType[]>([]);
  const [expense, setExpense] = useState({
    source: "",
    amount: 0,
    date: "",
  });

  useEffect(() => {
    props.setTotalExpenseAmount(
      expenseArr.reduce((total, expense) => total + expense.amount, 0)
    );
  }, [expenseArr]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(expense);
    const newExpense = {
      id: uuidv4(),
      source: expense.source,
      amount: expense.amount,
      date: expense.date,
    };

    setExpenseArr((prevIncomes) => {
      return [...prevIncomes, newExpense];
    });

    // reset input feild
    setExpense({
      source: "",
      amount: 0,
      date: "",
    });
  };

  //////////////////////////////////////////////////////////////////////
  const handleExpense = (event: ChangeEvent<HTMLInputElement>) => {
    setExpense((prevIncome) => {
      return { ...prevIncome, [event.target.name]: event.target.value };
    });
  };

  const handleDelete = (id: string) => {
    const filteredExpense = expenseArr.filter((expense) => expense.id !== id);
    setExpenseArr(filteredExpense);
  };

  return (
    <div>
      <section className="app_item expense">
        <form className="form-expense" onSubmit={handleSubmit}>
          <label htmlFor="source">Expense source</label>
          <input
            type="text"
            name="source"
            placeholder="Expense"
            value={expense.source}
            onChange={handleExpense}
          />

          <label>Amount of expense</label>
          <input
            type="number"
            name="amount"
            value={Number(expense.amount)}
            onChange={handleExpense}
          />

          <label>Date of expense</label>
          <input
            type="Date"
            name="date"
            value={expense.date}
            onChange={handleExpense}
          />
          <button>Add expense</button>
        </form>
      </section>
      
      <div className="expense-item">
        <ul>
          {expenseArr.map((newExpense) => {
            return (
              <div className="expense-list">
                <li key={newExpense.id}>
                  {newExpense.source}: {newExpense.amount}EUR on{" "}
                  {newExpense.date}
                </li>
                <button onClick={() => handleDelete(newExpense.id)}>
                  delete
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Expense;
