import React from "react";

import { useProductsStore } from "../../../../stores/productsStore";

import { Image, Name, Product, ProductsTable } from "./Table.styled";

const Table = () => {
  const products = useProductsStore((store) => store.products);

  return (
    <ProductsTable>
      {products.map(({ name, id, image, price }) => (
        <Product key={id}>
          <Image source={image} />
          <Name>Name: {name}</Name>
          <span>Price: {price}</span>
        </Product>
      ))}
    </ProductsTable>
  );
};

export default Table;
