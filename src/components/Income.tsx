import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

type IncomeType = {
  id: string;
  source: string;
  amount: number;
  date: string;
};

type GetIncome = {
  setTotalIncomeAmount: (totalIncomeAmount: number) => void;
};

const Income = (props: GetIncome) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IncomeType>(); 

  const [incomeArr, setIncomeArr] = useState<IncomeType[]>([]);

  // ???????????????????? 

  useEffect(() => {
    props.setTotalIncomeAmount(
      incomeArr.reduce((total, income) => total + income.amount, 0)
    );
  }, [incomeArr]);

  const onSubmit: SubmitHandler<IncomeType> = (data: any) => {
    const newIncome = {
      id: uuidv4(),
      ...data,
      amount: parseFloat(data.amount),
    };

    setIncomeArr((prevIncomes) => [...prevIncomes, newIncome]);
    reset();
  };

  const handleDelete = (id: string) => {
    const filteredIncome = incomeArr.filter((income) => income.id !== id);
    setIncomeArr(filteredIncome);
  };

  return (
    <div>
      <section className="app_item income">
        <form className="form-income" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="source">Income source</label>
          <input
            type="text"
            placeholder="Enter the source of income"
            {...register("source", {
              required: "Enter the source of income",
            })}
          />
          {errors.source && <span>{errors.source.message}</span>}

          <label>Amount of income</label>
          <input
            type="number"
            placeholder="Enter the amount of income"
            {...register("amount", {
              required: "Amount of income is required",
              validate: (value) =>
                value > 0 || "Income amount must be more than Zero",
            })}
          />
          {errors.amount && <span>{errors.amount.message}</span>}

          <label>Date of income</label>
          <input
            type="Date"
            {...register("date", { required: "Date of income is required" })}
          />
          {errors.date && <span>{errors.date.message}</span>}

          <button type="submit">Add income</button>
        </form>
      </section>

      <div className="income-item">
        <ul>
          {incomeArr.map((newIncome) => (
            <div className="income-list" key={newIncome.id}>
              <li>
                {newIncome.source}: {newIncome.amount}EUR on {newIncome.date}
              </li>
              <button onClick={() => handleDelete(newIncome.id)}>delete</button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Income;
