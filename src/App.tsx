import React, { useState } from 'react';
import '../public/app.css'
import Income from './components/Income'
import Expense from './components/Expense';
import Saving from './components/Saving';
import Balance from './components/Balance';




function App() {

  const [transferAmount, setTransferAmount] = useState<number>(0);

  const handleTransferAmountChange = (amount: number) => {
    setTransferAmount(amount)

  }







  return (
    <div className="App">
      <Income />
      <br />

      <Expense />
      <br />

      <Saving transferAmount={transferAmount} />
      <br />

      <Balance onTransferAmountChange={handleTransferAmountChange} />
    </div>
  );
}

export default App;
