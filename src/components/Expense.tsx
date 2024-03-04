const Expense = () => {
  return (
    <section>
      <label>Expense source</label>
      <br />
      <input type="text" placeholder="Expense" />

      <br />
      <label>Amount of expense</label>
      <br />
      <input type="number" />

      <br />
      <label>Date of expense</label>
      <br />
      <input type="Date" />
      <br />
      <button>Add expense</button>
    </section>
  );
};

export default Expense;
