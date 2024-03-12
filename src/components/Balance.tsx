import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// type TransferType = {
//   id: string;
//   transferAmount: number;
// };

type BalanceAndTransfer = {
  balance: number;
  transferSaving: (amount: number) => void;
};

const Balance = (props: BalanceAndTransfer) => {
  // const [savingArray, setSavingArray] = useState<TransferType[]>([]);
  const [savingAmount, setSavingAmount] = useState(0);

  const handleTransferSaving = (event: ChangeEvent<HTMLInputElement>) => {
    setSavingAmount(Number(event.target.value));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    props.transferSaving(savingAmount);
    setSavingAmount(0);
  };

  return (
    <section className="app_item balance">
      <label>Current balance: {props.balance}</label>

      <form className="form-balance" onSubmit={handleSubmit}>
        <label>Transfer to saving account</label>
        <input
          type="number"
          name="transferAmount"
          value={savingAmount}
          onChange={handleTransferSaving}
        />
        <button>Transfer</button>
      </form>
    </section>
  );
};

export default Balance;
