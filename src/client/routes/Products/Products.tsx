import React from "react";

import { PageWrap } from "../../App.styled";

import Filters from "./components/Filters";
import Table from "./components/Table";

const Products = () => (
  <PageWrap>
    <Filters />
    <Table />
  </PageWrap>
);

export default Products;
