import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { SubmitHandler, useForm } from "react-hook-form";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExpenseType>();

  const [expenseArr, setExpenseArr] = useState<ExpenseType[]>([]);

  useEffect(() => {
    props.setTotalExpenseAmount(
      expenseArr.reduce((total, expense) => total + expense.amount, 0)
    );
  }, [expenseArr]);

  const onSubmit: SubmitHandler<ExpenseType> = (data: any) => {
    const newExpense = {
      id: uuidv4(),
      ...data,
      amount: parseFloat(data.amount),
    };

    setExpenseArr((prevExpense) => [...prevExpense, newExpense]);
    reset();
  };

  // const handleSubmit = (event: FormEvent) => {
  //   event.preventDefault();
  //   console.log(expense);
  //   const newExpense = {
  //     id: uuidv4(),
  //     source: expense.source,
  //     amount: expense.amount,
  //     date: expense.date,
  //   };

  //   setExpenseArr((prevIncomes) => {
  //     return [...prevIncomes, newExpense];
  //   });

  //   // reset input feild
  //   setExpense({
  //     source: "",
  //     amount: 0,
  //     date: "",
  //   });
  // };

  //////////////////////////////////////////////////////////////////////
  // const handleExpense = (event: ChangeEvent<HTMLInputElement>) => {
  //   setExpense((prevIncome) => {
  //     return { ...prevIncome, [event.target.name]: event.target.value };
  //   });
  // };

  const handleDelete = (id: string) => {
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
            {...register("source", {
              required: "Enter the source of expense",
            })}
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
            {...register("date", { required: "Date of income is required" })}
          />
          {errors.date && <span>{errors.date.message}</span>}

          <button type="submit">Add expense</button>
        </form>
      </section>

      <div className="expense-item">
        <ul>
          {expenseArr.map((newExpense) => (
            <div className="income-list" key={newExpense.id}>
              <li>
                {newExpense.source}: {newExpense.amount}EUR on {newExpense.date}
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
