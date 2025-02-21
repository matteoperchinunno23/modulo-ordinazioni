// src/data/menuItems.js
export const menuItems = {
  panini: {
    title: "Panini",
    items: [
      { id: "salamella", name: "Panino con salamella", price: 3.50 },
      { id: "wurstel", name: "Panino con würstel", price: 3.50 },
      { id: "verdure_panino", name: "Panino con verdure", price: 3.20 },
    ]
  },
  primi: {
    title: "Primi Piatti",
    items: [
      { id: "pasta_sugo", name: "Pasta al sugo", price: 1.20 },
      { id: "pasta_ragu", name: "Pasta al ragù", price: 1.50 },
      { id: "pasta_bianca", name: "Pasta in bianco", price: 1.00 },
    ]
  },
  contorni: {
    title: "Contorni",
    items: [
      { id: "verdure", name: "Verdure", price: 1.10 },
      { id: "patatine_piccole", name: "Patatine fritte piccole", price: 1.50 },
      { id: "patatine_medie", name: "Patatine fritte medie", price: 1.10 },
      { id: "patatine_grandi", name: "Patatine fritte grandi", price: 1.00 },
    ]
  },
  salse: {
    title: "Salse",
    items: [
      { id: "ketchup", name: "Ketchup", price: 0.40 },
      { id: "maionese", name: "Maionese", price: 0.40 },
    ]
  },
  bevande: {
    title: "Bevande",
    items: [
      { id: "acqua_frizzante", name: "Acqua frizzante 0,5L", price: 1.00 },
      { id: "acqua_naturale", name: "Acqua naturale 0,5L", price: 1.00 },
      { id: "birra_media", name: "Birra media", price: 1.10 },
      { id: "birra_piccola", name: "Birra piccola", price: 1.00 },
      { id: "vino_bianco", name: "Vino bianco", price: 2.00 },
      { id: "vino_rosso", name: "Vino rosso", price: 2.00 },
    ]
  },
  dolci: {
    title: "Dolci",
    items: [
      { id: "torta_margherita", name: "Torta margherita", price: 1.00 },
      { id: "torta_cioccolato", name: "Torta al cioccolato", price: 1.00 },
      { id: "brownies", name: "Brownies", price: 1.00 },
      { id: "crepes", name: "Crepes", price: 1.00 },
    ]
  }
};

// src/components/OrderForm.jsx
import React, { useState } from 'react';
import { menuItems } from '../data/menuItems';
import './OrderForm.css';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    tableNumber: '',
    items: {},
  });

  const [step, setStep] = useState(1);

  const updateQuantity = (categoryId, itemId, delta) => {
    setFormData(prev => {
      const currentQuantity = prev.items[itemId] || 0;
      const newQuantity = Math.max(0, currentQuantity + delta);
      
      return {
        ...prev,
        items: {
          ...prev.items,
          [itemId]: newQuantity
        }
      };
    });
  };

  const calculateTotal = () => {
    return Object.entries(formData.items).reduce((total, [itemId, quantity]) => {
      const item = Object.values(menuItems)
        .flatMap(category => category.items)
        .find(item => item.id === itemId);
      return total + (item?.price || 0) * quantity;
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Qui implementeremo la logica per inviare i dati ad Airtable
    console.log('Form submitted:', formData);
  };

  const renderPersonalInfo = () => (
    <div className="personal-info">
      <h2>Informazioni Personali</h2>
      <input
        type="text"
        placeholder="Nome"
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        required
      />
      <input
        type="text"
        placeholder="Cognome"
        value={formData.surname}
        onChange={(e) => setFormData(prev => ({ ...prev, surname: e.target.value }))}
        required
      />
      <input
        type="number"
        placeholder="Numero Tavolo"
        value={formData.tableNumber}
        onChange={(e) => setFormData(prev => ({ ...prev, tableNumber: e.target.value }))}
        required
      />
      <button onClick={() => setStep(2)}>Continua</button>
    </div>
  );

  const renderMenuSection = () => (
    <div className="menu-section">
      {Object.entries(menuItems).map(([categoryId, category]) => (
        <div key={categoryId} className="category">
          <h2>{category.title}</h2>
          <div className="items">
            {category.items.map(item => (
              <div key={item.id} className="item">
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">{item.price.toFixed(2)}€</span>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(categoryId, item.id, -1)}>-</button>
                  <span>{formData.items[item.id] || 0}</span>
                  <button onClick={() => updateQuantity(categoryId, item.id, 1)}>+</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={() => setStep(3)}>Vai al riepilogo</button>
    </div>
  );

  const renderSummary = () => (
    <div className="summary">
      <h2>Riepilogo Ordine</h2>
      <div className="personal-details">
        <p><strong>Nome:</strong> {formData.name}</p>
        <p><strong>Cognome:</strong> {formData.surname}</p>
        <p><strong>Tavolo:</strong> {formData.tableNumber}</p>
      </div>
      <div className="order-items">
        {Object.entries(formData.items).map(([itemId, quantity]) => {
          if (quantity === 0) return null;
          const item = Object.values(menuItems)
            .flatMap(category => category.items)
            .find(item => item.id === itemId);
          return (
            <div key={itemId} className="summary-item">
              <span>{item.name} x{quantity}</span>
              <span>{(item.price * quantity).toFixed(2)}€</span>
            </div>
          );
        })}
      </div>
      <div className="total">
        <strong>Totale: {calculateTotal().toFixed(2)}€</strong>
      </div>
      <div className="actions">
        <button onClick={() => setStep(2)}>Modifica Ordine</button>
        <button onClick={handleSubmit}>Invia Ordine</button>
      </div>
    </div>
  );

  return (
    <form className="order-form">
      {step === 1 && renderPersonalInfo()}
      {step === 2 && renderMenuSection()}
      {step === 3 && renderSummary()}
    </form>
  );
};

export default OrderForm;

// src/components/OrderForm.css
.order-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', sans-serif;
}

.personal-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}

.category {
  margin: 20px 0;
  background: white;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.item-info {
  flex-grow: 1;
}

.item-name {
  font-size: 16px;
  color: #333;
}

.item-price {
  color: #666;
  margin-left: 10px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-controls button {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background-color: #007AFF;
  color: white;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-controls button:hover {
  background-color: #0056b3;
}

.summary {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.total {
  margin-top: 20px;
  padding: 15px 0;
  border-top: 2px solid #eee;
  font-size: 1.2rem;
  text-align: right;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

button {
  padding: 12px 24px;
  background-color: #007AFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #0056b3;
}

@media (max-width: 480px) {
  .order-form {
    padding: 10px;
  }

  .item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .quantity-controls {
    width: 100%;
    justify-content: flex-end;
  }

  .actions {
    flex-direction: column;
  }

  button {
    width: 100%;
  }
}

// src/App.jsx
import React from 'react';
import OrderForm from './components/OrderForm';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <header>
        <h1>Ordina il tuo pasto</h1>
      </header>
      <main>
        <OrderForm />
      </main>
    </div>
  );
};

export default App;

// src/App.css
.app {
  min-height: 100vh;
  background-color: #f5f5f5;
}

header {
  background-color: #007AFF;
  color: white;
  padding: 20px;
  text-align: center;
}

h1 {
  margin: 0;
  font-size: 1.8rem;
}

main {
  padding: 20px;
}

// src/index.css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f5f5;
}