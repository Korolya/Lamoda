import React, { useState, useEffect } from "react";
import styles from "./ProductList.module.css";
import ProductItem from "./ProductItem";
import productsData from "../src/products";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    searchString: "",
    colors: [],
    categories: [],
    priceRange: { min: 0, max: 0 }
  });
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    const filterProducts = () => {
      let filteredProducts = productsData;

      if (filters.searchString) {
        filteredProducts = filteredProducts.filter((product) =>
          product.name
            .toLowerCase()
            .includes(filters.searchString.toLowerCase())
        );
      }

      if (filters.colors.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          filters.colors.includes(product.color)
        );
      }

      if (filters.categories.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          filters.categories.includes(product.category)
        );
      }

      if (filters.priceRange.min > 0 || filters.priceRange.max > 0) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            filters.priceRange.min <= product.price &&
            product.price <= filters.priceRange.max
        );
      }

      if (sortType === "price-low-to-high") {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sortType === "price-high-to-low") {
        filteredProducts.sort((a, b) => b.price - a.price);
      }

      setProducts(filteredProducts);
    };

    filterProducts();
  }, [filters, sortType]);

  const handleColorChange = (event) => {
    const { value, checked } = event.target;
    let updatedColors;

    if (checked) {
      updatedColors = [...filters.colors, value];
    } else {
      updatedColors = filters.colors.filter((color) => color !== value);
    }

    setFilters({ ...filters, colors: updatedColors });
  };

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    let updatedCategories;

    if (checked) {
      updatedCategories = [...filters.categories, value];
    } else {
      updatedCategories = filters.categories.filter(
        (category) => category !== value
      );
    }

    setFilters({ ...filters, categories: updatedCategories });
  };

  const handlePriceRangeChange = (event) => {
    const { name, value } = event.target;

    setFilters({
      ...filters,
      priceRange: {
        ...filters.priceRange,
        [name]: Number(value)
      }
    });
  };

  const handleSortTypeChange = (type) => {
    if (type === sortType) {
      setSortType("");
    } else {
      setSortType(type);
    }
  };

  return (
    <div className={styles.productList}>
      <div className={styles.filterContainer}>
        <input
          type="text"
          placeholder="Search"
          value={filters.searchString}
          onChange={(event) =>
            setFilters({ ...filters, searchString: event.target.value })
          }
        />
        <div className={styles.colorFilter}>
          <span>Colors:</span>
          <label>
            <input
              type="checkbox"
              value="red"
              checked={filters.colors.includes("red")}
              onChange={handleColorChange}
            />
            Red
          </label>
          <label>
            <input
              type="checkbox"
              value="blue"
              checked={filters.colors.includes("blue")}
              onChange={handleColorChange}
            />
            Blue
          </label>
          <label>
            <input
              type="checkbox"
              value="green"
              checked={filters.colors.includes("green")}
              onChange={handleColorChange}
            />
            Green
          </label>
          <label>
            <input
              type="checkbox"
              value="black"
              checked={filters.colors.includes("black")}
              onChange={handleColorChange}
            />
            Black
          </label>
          <label>
            <input
              type="checkbox"
              value="white"
              checked={filters.colors.includes("white")}
              onChange={handleColorChange}
            />
            White
          </label>
        </div>
        <div className={styles.categoryFilter}>
          <span>Categories:</span>
          <label>
            <input
              type="checkbox"
              value="electronics"
              checked={filters.categories.includes("electronics")}
              onChange={handleCategoryChange}
            />
            Electronics
          </label>
          <label>
            <input
              type="checkbox"
              value="clothing"
              checked={filters.categories.includes("clothing")}
              onChange={handleCategoryChange}
            />
            Clothing
          </label>
          <label>
            <input
              type="checkbox"
              value="home"
              checked={filters.categories.includes("home")}
              onChange={handleCategoryChange}
            />
            Home
          </label>
        </div>
        <div className={styles.priceRangeFilter}>
          <span>Price Range: </span>
          <input
            type="number"
            name="min"
            placeholder="Min"
            value={filters.priceRange.min}
            onChange={handlePriceRangeChange}
          />
          <input
            type="number"
            name="max"
            placeholder="Max"
            value={filters.priceRange.max}
            onChange={handlePriceRangeChange}
          />
        </div>
      </div>
      <div className={styles.sortContainer}>
        <button
          className={sortType === "price-low-to-high" ? styles.activeSort : ""}
          onClick={() => handleSortTypeChange("price-low-to-high")}
        >
          Price: Low to High
        </button>
        <button
          className={sortType === "price-high-to-low" ? styles.activeSort : ""}
          onClick={() => handleSortTypeChange("price-high-to-low")}
        >
          Price: High to Low
        </button>
      </div>
      <div className={styles.productItems}>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
