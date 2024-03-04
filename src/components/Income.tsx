

const Income = () => {
    return (
      <section>
        <label>Income source</label>
        <br />
        <input type="text" placeholder="Salary" />

        <br />
        <label>Amount of income</label>
        <br />
        <input type="number" />

        <label>Date of income</label>
        <br />
        <input type="Date" />
        <br />
        <button>Add income</button>
      </section>
    );
}

export default Income;
