import React, { useContext, useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';

import styles from './Card.module.scss';
import AppContext from '../../context';
import SizesModal from '../SizeModal/SizesModal';

const Card = ({
  id,
  name,
  price,
  imageUrl,
  favorited = false,
  loading = false,
  onPlusClick,
  onAddToFavorite,
  offSize = true,
}) => {
  const { isItemAdded } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(favorited);
  const [size, setSize] = useState('');
  const [onSizes, setOnSizes] = useState(false);
  const [notification, setNotification] = useState(false);

  const showNotification = () => {
    setNotification(true);
  };

  useEffect(() => {
    let timer = setTimeout(() => setNotification(false), 4000);
    return () => clearTimeout(timer);
  }, [notification]);

  const onClickPlus = () => {
    onPlusClick({ id, parentId: id, name, price, imageUrl, size });
  };

  const onClickFavorite = () => {
    onAddToFavorite({ id, parentId: id, name, price, imageUrl });
    setIsFavorite(!isFavorite);
  };

  const addedSize = (value) => {
    setSize(value);
  };

  return (
    <>
      <div className={styles.card}>
        {loading ? (
          <ContentLoader
            speed={2}
            width={180}
            height={250}
            viewBox="0 0 155 265"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb">
            <rect x="0" y="0" rx="10" ry="10" width="155" height="155" />
            <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
            <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
            <rect x="0" y="234" rx="5" ry="5" width="80" height="25" />
            <rect x="123" y="230" rx="10" ry="10" width="32" height="32" />
          </ContentLoader>
        ) : (
          <>
            <div className={styles.favorite} onClick={onClickFavorite}>
              {onAddToFavorite && (
                <img
                  src={isFavorite ? 'img/liked.svg' : 'img/unliked.svg'}
                  alt="Unliked"
                />
              )}
            </div>
            <img width="100%" height={130} src={imageUrl} alt="Sneakers" />
            <h5>{name}</h5>
            {offSize ? (
              <button onClick={() => setOnSizes(!onSizes)}>Розміри</button>
            ) : (
              ''
            )}
            <div className={styles.d_f1}>
              <div className={styles.d_f2}>
                <span>Ціна: </span>
                <b>{price} грн.</b>
              </div>
              {onPlusClick && (
                <img
                  className={`${styles.plus}`}
                  onClick={!size ? showNotification : onClickPlus}
                  src={
                    isItemAdded(id) ? 'img/btn-checked.svg' : 'img/btn-plus.svg'
                  }
                  alt="Plus"
                />
              )}
            </div>
          </>
        )}
        <SizesModal
          onSizes={onSizes}
          setOnSizes={setOnSizes}
          addedSize={addedSize}
        />
        <p
          className={`${styles.notification} ${notification && styles.active}`}>
          Оберіть розмір кросівок!
        </p>
      </div>
    </>
  );
};

export default Card;
