import React from "react";
import styles from "./ProductItem.module.css";

const ProductItem = ({ product }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <span key={i} className={styles.star}>
            &#9733;
          </span>
        );
      } else {
        stars.push(
          <span key={i} className={styles.star}>
            &#9734;
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div className={styles.productItem}>
      <img
        src={product.image}
        alt={product.name}
        className={styles.productImage}
      />

      <div className={styles.productInfo}>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <p>Color: {product.color}</p>
        <p>Category: {product.category}</p>
        <div className={styles.rating}>
          Rating: {renderStars(product.rating)}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
