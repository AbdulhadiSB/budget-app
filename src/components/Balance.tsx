const Balance = () => {
  return (
    <section>
      <label>Current balance: </label>
      <span>0</span>
      <br />

      <label>Transfer to saving account</label>
      <input type="number" />
      <button>Transfer</button>
    </section>
  );
};

export default Balance;
