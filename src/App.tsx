import React from 'react';
import Income from './components/Income'
import Expense from './components/Expense';
import Saving from './components/Saving';




function App() {
  return (
    <div className="App">
      <Income />
      <br />
      <Expense />
      <br />
      <Saving />
    </div>
  );
}

export default App;
