import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const Saving = (props: { savingAmount: number }) => {
  const savingSchema = z.object({
    target: z.coerce.number().nonnegative("Target must be positive number"),
  });

  type SavingZod = z.infer<typeof savingSchema>;

  const [target, setTarget] = useState<number>(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SavingZod>({ resolver: zodResolver(savingSchema) });



  const onSubmit: SubmitHandler<SavingZod> = (data: SavingZod) => {
    setTarget(data.target);
    reset();
  };

 

  const percentageCalculating = () => {
    if (target > props.savingAmount) {
      return Math.floor((props.savingAmount / target) * 100);
    } else {
      return 100;
    }
  };

  return (
    <div>
      <section className="app_item saving">
        <form className="form-saving" onSubmit={handleSubmit(onSubmit)}>
          <label>Set target</label>
          <input
            type="text"
            className="form__input"
            id="target__input"
            {...register("target")}
          />
          {errors.target && (
            <span className="error-msg">{errors.target.message}</span>
          )}

          <button>Add Target</button>

          <button onClick={() => setTarget(0)}>Reset</button>

          <label>Current saving: {props.savingAmount}</label>

          <label>Target: {target}</label>

          <label>Progress: {target > 0 ? percentageCalculating() : 0} %</label>
          <progress value={props.savingAmount} max={target}>
            {" "}
          </progress>
        </form>
      </section>
    </div>
  );
};

export default Saving;
