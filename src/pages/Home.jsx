import React from 'react';
import Card from '../components/Card/Card';
import Emoji from '../components/Emoji';

const Home = ({
  dataSneakers,
  searchValue,
  setSearchValue,
  isLoading,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
}) => {
  const renderItems = () => {
    const filtredDataSneakers = dataSneakers.filter((sneakers) =>
      sneakers.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
    if (filtredDataSneakers.length === 0 && !isLoading) {
      return <Emoji>Нажаль ми не змогли знайти "{searchValue}"</Emoji>;
    }
    return (isLoading ? [...Array(8)] : filtredDataSneakers).map(
      (sneaker, index) => (
        <Card
          key={sneaker ? sneaker.id : index}
          id={sneaker && sneaker.id}
          name={sneaker && sneaker.name}
          price={sneaker && sneaker.price}
          imageUrl={sneaker && sneaker.imageUrl}
          loading={isLoading}
          onAddToFavorite={onAddToFavorite}
          onPlusClick={onAddToCart}
          {...sneaker}
        />
      ),
    );
  };
  return (
    <div className="content">
      <div className="block-d-f">
        <h1>
          {searchValue ? `Пошук по запиту: ${searchValue}` : 'Всі кросівки'}
        </h1>
        <div className="search-block">
          <img src="img/search.svg" alt="Search" />
          <input
            placeholder="Пошук ..."
            value={searchValue}
            onChange={onChangeSearchInput}
          />
          {searchValue && (
            <img
              onClick={() => setSearchValue('')}
              className="removeBtn"
              src="img/btn-remove.svg"
              alt="Remove"
            />
          )}
        </div>
      </div>
      <div className="sneakers">{renderItems()}</div>
    </div>
  );
};

export default Home;
