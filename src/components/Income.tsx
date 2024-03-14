import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"


type GetIncome = {
  setTotalIncomeAmount: (totalIncomeAmount: number) => void;
};

const incomeSchema = z.object({
  id: z.string().optional(),
  source: z
    .string()
    .min(2, { message: "source must have at least 2 characters " }),
  amount: z.coerce
    .number()
    .positive({ message: "amount must be a positive number" }),
  date: z.coerce.date({
    required_error: "Please select a date and time",
  }),
});

type IncomeZod = z.infer<typeof incomeSchema>;

const Income = (props: GetIncome) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IncomeZod>({ resolver: zodResolver(incomeSchema) });

  const [incomeArr, setIncomeArr] = useState<IncomeZod[]>([]);

  useEffect(() => {
    props.setTotalIncomeAmount(
      incomeArr.reduce((total, income) => total + income.amount, 0)
    );
  }, [incomeArr]);

  const onSubmit: SubmitHandler<IncomeZod> = (data: IncomeZod) => {
      data.id = uuidv4();
      setIncomeArr((incomeArr) => [...incomeArr, data])
    // setIncomeArr((prevIncomes) => [...prevIncomes, newIncome]);
    reset();
  };

  const handleDelete = (id: string | undefined) => {
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
            {...register("source")}
            name="source"
          />
          {errors.source && <p> {errors.source.message}</p>}

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
                {newIncome.source}: {newIncome.amount} EUR on{" "}
                {newIncome.date.toDateString()}
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