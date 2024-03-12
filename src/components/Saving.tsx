import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";

type SavingProps = {
  transferAmount: number;
};

const Saving = (props: { savingAmount: number }) => {
  const [target, setTarget] = useState(0);
  const [saving, setSavings] = useState(0);

  useEffect(() => {
    setSavings(saving + props.savingAmount);
  }, [props.savingAmount]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setTarget(Number(0));
  };

  const handleTarget = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("target is working");
    setTarget(Number(event.target.value));
  };

  // Progress still to be done

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label>Set target</label>
        <input
          type="number"
          name="targetSaving"
          onChange={handleTarget}
          value={target}
        />
        <button>Reset</button>

        <label>Current saving: </label>
        <span>{props.savingAmount}</span>

        <label>Target: </label>
        <span>{target}</span>

        <label>Progress: </label>
        <progress value="0" max={target}>
          {" "}
        </progress>
      </form>
    </section>
  );
};

export default Saving;
