import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";


type SavingProps = {
  transferAmount: number;
};


const Saving = (props: { savingAmount: number }) => {
  const [target, setTarget] = useState(0);
  // const [saving, setSavings] = useState(0);
  // const [totalSaving, setTotalSaving] = useState<SavingArray[]>([]);

  // useEffect(() => {
  //   setSavings(saving + props.savingAmount);
  // }, [props.savingAmount]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setTarget(Number(0));
  };

  const handleTarget = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("target is working");
    setTarget(Number(event.target.value));
  };

  const percentageCalculating = () => {
    if (target > props.savingAmount) {
      return Math.floor((props.savingAmount / target) * 100)  
    } else {
      return 100;
    }
  }

  // Progress still to be done

  return (
    <section className="app_item saving">
      <form className="form-saving" onSubmit={handleSubmit}>
        <label>Set target</label>
        <input
          type="number"
          name="targetSaving"
          onChange={handleTarget}
          value={target}
        />
        <button>Reset</button>

        <label>Current saving: {props.savingAmount}</label>

        <label>Target: {target}</label>

        <label>Progress: {target > 0 ? percentageCalculating() : 0 } %</label>
        <progress value={props.savingAmount} max={target}>
          {" "}
        </progress>
      </form>
    </section>
  );
};

export default Saving;
