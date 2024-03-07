import React, { useContext, useEffect, useState } from 'react';
import Card from '../components/Card/Card';
import axios from 'axios';
import Emoji from '../components/Emoji';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          'https://65e1ff17a8583365b317c49d.mockapi.io/Orders',
        );
        setOrders(data.map((obj) => obj.items).flat());
        setIsLoading(false);
      } catch (error) {
        alert('Ошибка при запросе заказов');
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="content">
      <div className="block-d-f">
        <h1>Мої замовлення</h1>
      </div>
      <div className="sneakers">
        {(isLoading ? [...Array(8)] : orders).map((sneaker, index) => (
          <Card
            key={index}
            id={sneaker && sneaker.id}
            name={sneaker && sneaker.name}
            price={sneaker && sneaker.price}
            imageUrl={sneaker && sneaker.imageUrl}
            loading={isLoading}
            offSize={false}
          />
        ))}
        {orders.length === 0 && (
          <Emoji>Нажаль, ви ще нічого не замовляли в нас</Emoji>
        )}
      </div>
    </div>
  );
};

export default Orders;
