import React, { ChangeEvent, useCallback } from "react";

import { useProductsStore } from "../../../../stores/productsStore";

import { ProductFilters } from "../../../../stores/productsStore.interfaces";

import { FiltersRoot, FormControl } from "./Filters.styled";

const Filters = () => {
  const setFilters = useProductsStore.use.setFilters();
  const filters = useProductsStore.use.filters();

  const onFilterChange = useCallback(
    (e: ChangeEvent) => {
      const { id, value } = e.target as HTMLInputElement;
      setFilters({ [id]: value } as Partial<ProductFilters>);
    },
    [setFilters]
  );

  return (
    <FiltersRoot>
      <FormControl>
        <label htmlFor="search">Search</label>
        <input id="search" value={filters.search} onChange={onFilterChange} />
      </FormControl>
      <FormControl>
        <label htmlFor="sortBy">Sort By</label>
        <select id="sortBy" value={filters.sortBy} onChange={onFilterChange}>
          <option value="">None</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
      </FormControl>
      {filters.sortBy && (
        <FormControl>
          <label htmlFor="sortDir">Sort Direction</label>
          <select
            id="sortDir"
            value={filters.sortDir}
            onChange={onFilterChange}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </FormControl>
      )}
    </FiltersRoot>
  );
};

export default Filters;
