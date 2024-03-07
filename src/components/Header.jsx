import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const Header = ({ onClickCart }) => {
  const { totalPrice, tax } = useCart();
  return (
    <header>
      <Link to="/">
        <div className="headerLeft">
          <img width={199} height={133} src="img/sneaker.png" alt="Logotype" />
          <div className="headerInfo">
            <h3>React Sneakers</h3>
            <p>Магазин найкращих кросівок</p>
          </div>
        </div>
      </Link>
      <ul className="headerRight">
        <li className="m-r30" onClick={onClickCart}>
          <img
            style={{
              marginRight: 10,
              width: 18,
              height: 18,
            }}
            src="img/cart.svg"
            alt="Cart"
          />
          <span>{+totalPrice + +tax} грн.</span>
        </li>
        <li className="m-r30">
          <Link to="/favorites">
            <img width={18} height={18} src="img/heart.svg" alt="Bookmarks" />
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img width={18} height={18} src="img/user.svg" alt="User" />
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
