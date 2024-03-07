import React, { useContext } from 'react';
import Card from '../components/Card/Card';
import Emoji from '../components/Emoji';
import AppContext from '../context';

const Favorites = () => {
  const { favorites, onAddToFavorite } = useContext(AppContext);
  return (
    <div className="content">
      <div className="block-d-f">
        <h1>Мої вподобання</h1>
      </div>
      <div className="sneakers">
        {favorites.length ? (
          favorites.map((sneaker) => (
            <Card
              key={sneaker.id}
              id={sneaker.id}
              name={sneaker.name}
              price={sneaker.price}
              imageUrl={sneaker.imageUrl}
              favorited={true}
              onAddToFavorite={onAddToFavorite}
              offSize={false}
              // {...sneaker}
            />
          ))
        ) : (
          <Emoji>Нажаль, ви нічого не додали до вподобань</Emoji>
        )}
      </div>
    </div>
  );
};

export default Favorites;
