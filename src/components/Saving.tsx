const Saving = () => {
  return (
    <section>
      <label>Set target</label>
      <br />
      <input type="number" />
      <br />
      <button>Reset</button>
      <br />

      <label>Current saving: </label>
      <span>0</span>
      <br />

      <label>Target: </label>
      <span>0</span>
      <br />

      <label>Progress: </label>
      <progress value="00" max="100">
        {" "}
        {" "}
      </progress>
    </section>
  );
};

export default Saving;
