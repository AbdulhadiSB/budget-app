import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type IncomeType = {
  id: string;
  source: number;
  amount: number;
  date: string;
};

const Income = () => {
  const [incomeArr, setIncomeArr] = useState<IncomeType[]>([]);
  const [income, setIncome] = useState({
    source: "",
    amount: 0,
    date: "",
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(income);
    const newIncome = {
      id: uuidv4(),
      source: income.source,
      amount: income.amount,
      date: income.date,
    };

    setIncomeArr((prevIncomes) => {
      return [...prevIncomes, newIncome];
    });

    // reset input feild
    setIncome({
      source: "",
      amount: 0,
      date: "",
    });
  };

  //////////////////////////////////////////////////////////////////////
  const handleIncome = (event: ChangeEvent<HTMLInputElement>) => {
    setIncome((prevIncome) => {
      return { ...prevIncome, [event.target.name]: event.target.value };
    });
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="source">Income source</label>
        <input
          type="text"
          name="source"
          placeholder="Enter Source of Income"
          // the value reset the feild
          value={income.source}
          onChange={handleIncome}
        />

        <label>Amount of income</label>
        <input
          type="number"
          name="amount"
          value={Number(income.amount)}
          onChange={handleIncome}
        />

        <label>Date of income</label>
        <input
          type="Date"
          name="date"
          value={income.date}
          onChange={handleIncome}
        />

        <button>Add income</button>
      </form>

      <div>
        <ul>
          {incomeArr.map((newIncome) => {
            return (
              <li key={newIncome.id}>
                {newIncome.source}: {newIncome.amount}EUR on {newIncome.date}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Income;
