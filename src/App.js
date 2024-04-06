import React from 'react';
import { CartProvider } from './components/Cart/CartContext';
import ProductList from './components/ProductList/ProductList';
import Cart from './components/Cart/Cart';
import './App.css';

function App() {
  return (
    <CartProvider>
      <div className="App">
        <h1>E-commerce Platform</h1>
        <ProductList />
        <Cart />
      </div>
    </CartProvider>
  );
}

export default App;
