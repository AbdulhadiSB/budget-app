import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type TransferType = {
  id: string;
  transferAmount: number;
};

type BalanceProps = {
  onTransferAmountChange: (amount: number) => void;
};

const Balance = ({onTransferAmountChange}: BalanceProps) => {
  const [transferArr, setTransferArr] = useState<TransferType[]>([]);
  const [transfer, setTransfer] = useState({
    id: "",
    transferAmount: 0,
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const newTransfer = {
      id: uuidv4(),
      transferAmount: transfer.transferAmount,
    };

    console.log(newTransfer);

    setTransferArr((prevTransfer) => {
      return [...prevTransfer, newTransfer];
    });

    onTransferAmountChange(transfer.transferAmount);
  };

  const handleTransfer = (event: ChangeEvent<HTMLInputElement>) => {
    setTransfer((prevTransfer) => {
      return { ...prevTransfer, [event.target.name]: event.target.value };
    });
  };

  return (
    <section>
      <label>Current balance: </label>
      <span>0</span>

      <form onSubmit={handleSubmit}>
        <label>Transfer to saving account</label>
        <input
          type="number"
          name="transferAmount"
          value={transfer.transferAmount}
          onChange={handleTransfer}
        />
        <button>Transfer</button>
      </form>
    </section>
  );
};

export default Balance;
