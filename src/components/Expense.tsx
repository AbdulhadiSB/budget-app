import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";


type GetExpense = {
  setTotalExpenseAmount: (totalExpenseAmount: number) => void;
};

const expenseSchema = z.object({
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

type ExpenseZod = z.infer<typeof expenseSchema>

const Expense = (props: GetExpense) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExpenseZod>({ resolver: zodResolver(expenseSchema) });

  const [expenseArr, setExpenseArr] = useState<ExpenseZod[]>([]);

  useEffect(() => {
    props.setTotalExpenseAmount(
      expenseArr.reduce((total, expense) => total + expense.amount, 0)
    );
  }, [expenseArr]);

  const onSubmit: SubmitHandler<ExpenseZod> = (data: ExpenseZod) => {
      data.id = uuidv4();
      setExpenseArr((expenseArr) => [...expenseArr, data])

      // setExpenseArr((prevExpense) => [...prevExpense, newExpense]);
      reset();
    };

    const handleDelete = (id: string | undefined) => {
    const filteredExpense = expenseArr.filter((expense) => expense.id !== id);
    setExpenseArr(filteredExpense);
  };



  return (
    <div>
      <section className="app_item expense">
        <form className="form-expense" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="source">Expense source</label>
          <input
            type="text"
            placeholder="Enter the source of expense"
            {...register("source")}
            name="source"
          />
          {errors.source && <span>{errors.source.message}</span>}

          <label>Amount of expense</label>
          <input
            type="number"
            placeholder="Enter the amount of expense"
            {...register("amount", {
              required: "Amount of expense is required",
              validate: (value) =>
                value > 0 || "Expense amount must be more than Zero",
            })}
          />
          {errors.amount && <span>{errors.amount.message}</span>}

          <label>Date of expense</label>
          <input
            type="Date"
            {...register("date", { required: "Date of expense is required" })}
          />
          {errors.date && <span>{errors.date.message}</span>}

          <button type="submit">Add expense</button>
        </form>
      </section>

      <div className="expense-item">
        <ul>
          {expenseArr.map((newExpense) => (
            <div className="expense-list" key={newExpense.id}>
              <li>
                {newExpense.source}: {newExpense.amount}EUR on {newExpense.date.toDateString()}
              </li>
              <button onClick={() => handleDelete(newExpense.id)}>
                delete
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Expense;
