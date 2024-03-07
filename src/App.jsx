import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import axios from 'axios';

import './index.scss';
import AppContext from './context';

import Header from './components/Header';
import Drawer from './components/Drawer/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

const App = () => {
  const [dataSneakers, setDataSneakers] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoriteResponse, sneakersResponse] =
          await Promise.all([
            axios.get('https://65e0b500d3db23f76249e880.mockapi.io/Cart'),
            axios.get('https://65e1ff17a8583365b317c49d.mockapi.io/Favorite'),
            axios.get('https://65e0b500d3db23f76249e880.mockapi.io/Items'),
          ]);
        // const cartResponse = await axios.get(
        //   'https://65e0b500d3db23f76249e880.mockapi.io/Cart',
        // );
        // const favoriteResponse = await axios.get(
        //   'https://65e1ff17a8583365b317c49d.mockapi.io/Favorite',
        // );
        // const sneakersResponse = await axios.get(
        //   'https://65e0b500d3db23f76249e880.mockapi.io/Items',
        // );

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavorites(favoriteResponse.data);
        setDataSneakers(sneakersResponse.data);
      } catch (error) {
        alert('Ошибка');
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    const findItem = cartItems.find(
      (item) => Number(item.parentId) === Number(obj.id),
    );
    try {
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id)),
        );
        await axios.delete(
          `https://65e0b500d3db23f76249e880.mockapi.io/Cart/${findItem.id}`,
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          'https://65e0b500d3db23f76249e880.mockapi.io/Cart',
          obj,
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
    }
  };
  const onRemoveToCard = (id) => {
    try {
      axios.delete(`https://65e0b500d3db23f76249e880.mockapi.io/Cart/${id}`);
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id)),
      );
    } catch (error) {
      alert('Ошибка при удалении с корзины ');
      console.error(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          `https://65e1ff17a8583365b317c49d.mockapi.io/Favorite/${obj.id}`,
        );
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id)),
        );
      } else {
        const { data } = await axios.post(
          'https://65e1ff17a8583365b317c49d.mockapi.io/Favorite',
          obj,
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      console.log(error);
      alert('Не удалось добавить');
    }
  };

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };
  return (
    <AppContext.Provider
      value={{
        dataSneakers,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
      }}>
      <div className="wrapper">
        <Drawer
          onCloseCart={() => setCartOpened(false)}
          cartItems={cartItems}
          onRemoveCart={onRemoveToCard}
          opened={cartOpened}
        />
        <Header onClickCart={() => setCartOpened(true)} cartItems={cartItems} />
        <Routes>
          <Route
            path="sneakers"
            element={
              <Home
                dataSneakers={dataSneakers}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                isLoading={isLoading}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
              />
            }
          />
          <Route path="favorites" element={<Favorites />} />
          <Route path="orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
};

export default App;
