import React from 'react';
import '../public/app.css'
import Income from './components/Income'
import Expense from './components/Expense';
import Saving from './components/Saving';
import Balance from './components/Balance';




function App() {
  return (
    <div className="App">
      <Income />
      <br />

      <Expense />
      <br />

      <Saving />
      <br />

      <Balance />
    </div>
  );
}

export default App;
