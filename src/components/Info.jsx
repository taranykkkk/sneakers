import React, { useContext } from 'react';
import AppContext from '../context';
const Info = ({ image, title, description }) => {
  const { setCartOpened } = useContext(AppContext);

  return (
    <div className="cartEmpty">
      <img className="box" width={120} src={image} alt="Empty" />
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={() => setCartOpened(false)} className="greenButton">
        <img src="img/arrow.svg" alt="Arrow" />
        Повернутись назад
      </button>
    </div>
  );
};

export default Info;
