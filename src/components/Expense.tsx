import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type ExpenseType = {
  id: string;
  source: number;
  amount: number;
  date: string;
};

const Expense = () => {
  const [expenseArr, setExpenseArr] = useState<ExpenseType[]>([]);
  const [expense, setExpense] = useState({
    source: "",
    amount: 0,
    date: "",
  });

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
    <section>
      <form onSubmit={handleSubmit}>
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

      <div>
          <ul>
            {expenseArr.map((newExpense) => {
              return (
                <div>
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
    </section>
  );
};

export default Expense;
