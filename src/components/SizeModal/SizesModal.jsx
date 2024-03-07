import React from 'react';
import styles from './SizeModal.module.scss';

const SIZES__SNEAKERS = [41, 42, 43, 44, 45];
const SizesModal = ({ onSizes, setOnSizes, addedSize }) => {
  return (
    <div
      onClick={() => setOnSizes(false)}
      className={` ${styles.size__modal} ${
        onSizes ? styles.size__module__show : ''
      }`}>
      {SIZES__SNEAKERS.map((size, i) => (
        <p onClick={() => addedSize(size)} key={i}>
          {size}
        </p>
      ))}
    </div>
  );
};

export default SizesModal;
