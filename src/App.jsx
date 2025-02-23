// src/App.jsx
import React from 'react';
import OrderForm from './components/OrderForm';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <header>
        <h1>Ordina il cibo</h1>
      </header>
      <main>
        <OrderForm />
      </main>
    </div>
  );
};

export default App;