import { useContext } from 'react';
import AppContext from '../context';

export const useCart = () => {
  const { cartItems, setCartItems } = useContext(AppContext);
  const totalPrice = cartItems.reduce((prev, curr) => curr.price + prev, 0);
  const tax = (totalPrice * 0.05).toFixed(2);
  return {
    cartItems,
    setCartItems,
    totalPrice,
    tax,
  };
};
