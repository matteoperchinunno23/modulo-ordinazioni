import React, { useState } from 'react';
import './OrderForm.css';

const menuItems = {
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

const OrderForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    tableNumber: '',
    items: {},
  });

  const [currentStep, setCurrentStep] = useState('personal');

  const updateQuantity = (itemId, delta) => {
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
    try {
      // Qui inserire la logica per Airtable
      const orderData = {
        ...formData,
        total: calculateTotal(),
        orderDate: new Date().toISOString()
      };
      
      console.log('Ordine inviato:', orderData);
      alert('Ordine inviato con successo!');
      
      // Reset del form
      setFormData({
        name: '',
        surname: '',
        tableNumber: '',
        items: {},
      });
      setCurrentStep('personal');
    } catch (error) {
      console.error('Errore nell\'invio dell\'ordine:', error);
      alert('Errore nell\'invio dell\'ordine. Riprova.');
    }
  };

// Modifica il PersonalInfoStep in OrderForm.jsx

const PersonalInfoStep = () => {
  return (
    <div className="form-step personal-info">
      <h2>Informazioni Personali</h2>
      <form className="info-form" onSubmit={(e) => e.preventDefault()}>
        <div className="input-container">
          <label>
            <span>Nome</span>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              autoComplete="off"
            />
          </label>

          <label>
            <span>Cognome</span>
            <input
              type="text"
              value={formData.surname}
              onChange={(e) => setFormData(prev => ({ ...prev, surname: e.target.value }))}
              autoComplete="off"
            />
          </label>

          <label>
            <span>Numero Tavolo</span>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={formData.tableNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, tableNumber: e.target.value }))}
              maxLength="3"
            />
          </label>
        </div>
        <button 
          type="button"
          className="button-primary"
          onClick={() => setCurrentStep('menu')}
          disabled={!formData.name || !formData.surname || !formData.tableNumber}
        >
          Continua al Menu
        </button>
      </form>
    </div>
  );
};

  const MenuStep = () => (
    <div className="form-step menu-section">
      <div className="menu-categories">
        {Object.entries(menuItems).map(([categoryId, category]) => (
          <div key={categoryId} className="category-card">
            <h3 className="category-title">{category.title}</h3>
            <div className="items-grid">
              {category.items.map(item => (
                <div key={item.id} className="menu-item">
                  <div className="item-details">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">{item.price.toFixed(2)}€</span>
                  </div>
                  <div className="quantity-controls">
                    <button 
                      type="button"
                      className="quantity-button"
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={!formData.items[item.id]}
                    >
                      -
                    </button>
                    <span className="quantity-display">
                      {formData.items[item.id] || 0}
                    </span>
                    <button 
                      type="button"
                      className="quantity-button"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="navigation-buttons">
        <button 
          type="button"
          className="button-secondary"
          onClick={() => setCurrentStep('personal')}
        >
          Indietro
        </button>
        <button 
          type="button"
          className="button-primary"
          onClick={() => setCurrentStep('summary')}
          disabled={Object.values(formData.items).every(v => !v)}
        >
          Vai al Riepilogo
        </button>
      </div>
    </div>
  );

  const SummaryStep = () => {
    const selectedItems = Object.entries(formData.items)
      .filter(([_, quantity]) => quantity > 0)
      .map(([itemId, quantity]) => {
        const item = Object.values(menuItems)
          .flatMap(category => category.items)
          .find(item => item.id === itemId);
        return { ...item, quantity };
      });

    return (
      <div className="form-step summary-section">
        <h2>Riepilogo Ordine</h2>
        <div className="summary-content">
          <div className="customer-info">
            <h3>Informazioni Cliente</h3>
            <p><strong>Nome:</strong> {formData.name}</p>
            <p><strong>Cognome:</strong> {formData.surname}</p>
            <p><strong>Tavolo:</strong> {formData.tableNumber}</p>
          </div>
          
          <div className="order-items">
            <h3>Articoli Ordinati</h3>
            {selectedItems.map(item => (
              <div key={item.id} className="summary-item">
                <div className="summary-item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-quantity">x{item.quantity}</span>
                </div>
                <span className="item-total">
                  {(item.price * item.quantity).toFixed(2)}€
                </span>
              </div>
            ))}
          </div>

          <div className="order-total">
            <span>Totale</span>
            <span>{calculateTotal().toFixed(2)}€</span>
          </div>
        </div>

        <div className="navigation-buttons">
          <button 
            type="button"
            className="button-secondary"
            onClick={() => setCurrentStep('menu')}
          >
            Modifica Ordine
          </button>
          <button 
            type="button"
            className="button-primary"
            onClick={handleSubmit}
          >
            Conferma Ordine
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="order-form">
      {currentStep === 'personal' && <PersonalInfoStep />}
      {currentStep === 'menu' && <MenuStep />}
      {currentStep === 'summary' && <SummaryStep />}
    </div>
  );
};

export default OrderForm;