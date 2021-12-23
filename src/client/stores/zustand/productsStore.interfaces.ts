import { Product, ProductFilters } from "../interfaces";

export interface ProductsStore {
  _products: Array<Product>;
  fetchProducts: () => Promise<Array<Product>>;
  filters: ProductFilters;
  setFilters: (filters: Partial<ProductFilters>) => void;
}

export interface ProductsComputed {
  products: Array<Product>;
}
