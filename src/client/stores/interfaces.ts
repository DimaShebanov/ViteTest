export interface ProductFilters {
  search: string;
  sortBy: string;
  sortDir: "asc" | "desc";
}

export interface Product {
  name: string;
  id: string;
  price: number;
  image: string;
}
