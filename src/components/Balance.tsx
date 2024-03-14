import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";


type BalanceAndTransfer = {
  balance: number;
  transferSaving: (amount: number) => void;
};

const Balance = (props: BalanceAndTransfer) => {
  // const [savingArray, setSavingArray] = useState<TransferType[]>([]);
  const [savingAmount, setSavingAmount] = useState(0);

  const balanceSchema = z.object({
    transfer: z.coerce
      .number()
      .nonnegative("Can't transfer a negative value!")
      .refine((value) => value > 0, {
        message: "Transfer amount must be positive",
      })
      .refine((value) => value <= props.balance, {
        message: "Balance after transfer cannot be negative",
      }),
  });

  type BalanceZod = z.infer<typeof balanceSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BalanceZod>({ resolver: zodResolver(balanceSchema) });

  const onSubmit: SubmitHandler<BalanceZod> = (data) => {
    props.transferSaving(data.transfer);
    setSavingAmount(data.transfer);
    reset();
  };

  return (
    <div>
      <section className="app_item balance">
        <form className="form-balance" onSubmit={handleSubmit(onSubmit)}>
          <label>Transfer to saving account</label>
          <input
            type="text"
            className="form__input"
            id="transfer--input"
            {...register("transfer")}
          />
          {errors.transfer && <span>{errors.transfer.message}</span>}
          <button>Transfer</button>
        </form>

        <h2>
          Current balance: <h2 className="balance-amount">{props.balance}</h2>
        </h2>
      </section>
    </div>
  );
};

export default Balance;
