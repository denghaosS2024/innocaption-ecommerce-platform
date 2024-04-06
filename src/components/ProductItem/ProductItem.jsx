import React from 'react';
import './ProductItem.css';
import { useCart } from '../Cart/CartContext';
import styled from 'styled-components';

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 0.5em 1em;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }

  /* Icon spacing */
  i {
    margin-right: 8px;
  }
`;

const ProductItem = ({ product }) => {
    const { addToCart } = useCart();
  return (
    <div className="productItem">
      <img src={product.thumbnail} alt={product.title} className="productImage" />
      <h3>{product.title}</h3>
      <p className="productDescription">{product.description}</p>
      <b>${product.price}</b>
      <Button onClick={() => addToCart(product)}><i className="fas fa-shopping-cart"></i> Add to Cart</Button>
    </div>
  );
};

export default ProductItem;
