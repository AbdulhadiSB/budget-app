import React, { ChangeEvent, FormEvent, useState } from "react";

type SavingProps = {
  transferAmount: number;
}

const Saving = ({transferAmount}: SavingProps) => {
  const [target, setTarget] = useState(0);

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
        <span>{transferAmount}</span>

        <label>Target: </label>
        <span>{target}</span>

        <label>Progress: </label>
        <progress value="00" max="100">
          {" "}
        </progress>
      </form>
    </section>
  );
};

export default Saving;
