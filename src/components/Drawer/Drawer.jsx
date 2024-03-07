import React, { useState } from 'react';
import axios from 'axios';

import { useCart } from '../../hooks/useCart';
import Info from '../Info';

import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = ({ onCloseCart, onRemoveCart, opened }) => {
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { totalPrice, tax, cartItems, setCartItems } = useCart();

  if (opened) {
    document.body.style = 'overflow-y: hidden';
  } else {
    document.body.style = 'overflow-y: auto';
  }

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        'https://65e1ff17a8583365b317c49d.mockapi.io/Orders',
        { items: cartItems },
      );

      setOrderId([data.id]);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          `https://65e0b500d3db23f76249e880.mockapi.io/Cart/` + item.id,
        );
        await delay(1000);
      }
    } catch (error) {
      alert('Не удалось создать заказ ');
    }
    setIsLoading(false);
  };
  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={`${styles.drawer} ${opened ? '' : ''}`}>
        <h2>
          Корзина
          <img
            onClick={onCloseCart}
            className="removeBtn"
            src="/img/btn-remove.svg"
            alt="Remove"
          />
        </h2>
        {cartItems.length > 0 ? (
          <>
            <div className={`${styles.items}`}>
              {cartItems.map((sneaker, index) => (
                <div key={index} className="cartItem">
                  <div
                    className="cartItemImg"
                    style={{
                      backgroundImage: `url(${sneaker.imageUrl})`,
                    }}></div>
                  <div className="itemDesc">
                    <p>{sneaker.name}</p>
                    <b>{sneaker.price} грн.</b>
                  </div>

                  <img
                    id={sneaker.id}
                    className="removeBtn"
                    src="img/btn-remove.svg"
                    alt="Remove"
                    onClick={() => onRemoveCart(sneaker.id)}
                  />
                  <p className="size">Розмір: {sneaker.size}</p>
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li className="cartBottomDesc">
                  <span>Сумма:</span>
                  <div></div>
                  <b>{totalPrice} грн.</b>
                </li>
                <li className="cartBottomDesc">
                  <span>Податок 5%:</span>
                  <div></div>
                  <b>{tax} грн.</b>
                </li>
                <li className="cartBottomDesc">
                  <span>Всього:</span>
                  <div></div>
                  <b>{totalPrice + +tax} грн.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                className="greenButton"
                onClick={onClickOrder}>
                Оформити замовлення <img src="img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </>
        ) : (
          <Info
            image={
              isOrderComplete ? 'img/complete-order.jpg' : 'img/empty-cart.jpg'
            }
            title={
              isOrderComplete ? 'Замовлення здійснено!' : 'Корзина порожня'
            }
            description={
              isOrderComplete
                ? `Ваше замовлення #${orderId} прийнято і скоро буде переданно на відправку!`
                : 'Додайте хоча б одну пару кросівок, щоб зробити замовлення'
            }
          />
        )}
      </div>
    </div>
  );
};

export default Drawer;
