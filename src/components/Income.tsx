import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

type IncomeType = {
  id: string;
  source: string;
  amount: number;
  date: string;
};

type GetIncome = { setTotalIncomeAmount: (totalIncomeAmount: number) => void };

const Income = (props: GetIncome) => {
  const [incomeArr, setIncomeArr] = useState<IncomeType[]>([]);
  const [income, setIncome] = useState({
    source: "",
    amount: 0,
    date: "",
  });

  useEffect(() => {
    props.setTotalIncomeAmount(
      incomeArr.reduce((total, income) => total + income.amount, 0)
    );
  }, [incomeArr]);

  const handleIncome = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setIncome((prevIncome) => {
      return { ...prevIncome, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(income);
    const newIncome = {
      id: uuidv4(),
      source: income.source,
      amount: Number(income.amount),
      date: income.date,
    };

    // onIncomeAmountChange(income.amount);

    setIncomeArr((prevIncomes) => {
      return [...prevIncomes, newIncome];
    });

    // const totalIncomeAmount = incomeArr.reduce(
    //   (total, currentValue) => total + currentValue.amount,
    //   0
    // );
    // props.onGetTotalIncomeAmount(totalIncomeAmount);

    // reset input feild
    setIncome({
      source: "",
      amount: 0,
      date: "",
    });
  };

  //////////////////////////////////////////////////////////////////////

  const handleDelete = (id: string) => {
    const filteredIncome = incomeArr.filter((income) => income.id !== id);
    setIncomeArr(filteredIncome);
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
          required
        />

        <label>Amount of income</label>
        <input
          type="number"
          name="amount"
          value={Number(income.amount)}
          onChange={handleIncome}
          required
        />

        <label>Date of income</label>
        <input
          type="Date"
          name="date"
          value={income.date}
          onChange={handleIncome}
          required
        />

        <button>Add income</button>
      </form>

      <div>
        <ul>
          {incomeArr.map((newIncome) => {
            return (
              <div>
                <li key={newIncome.id}>
                  {newIncome.source}: {newIncome.amount}EUR on {newIncome.date}
                </li>
                <button onClick={() => handleDelete(newIncome.id)}>
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

export default Income;
