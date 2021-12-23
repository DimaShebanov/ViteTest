import create from "zustand";
import { createSelectorFunctions } from "auto-zustand-selectors-hook";

import { orderBy } from "lodash-es";

import { bindImmer } from "../../utils/bindImmer";

import { mockResponse } from "../../utils/mockResponse";

import { getProductsList } from "../../routes/Products/productFactory";

import { ProductsComputed, ProductsStore } from "./productsStore.interfaces";
import { useLoadingStore } from "./loadingStore";
import { computed } from "./middlewares/computed";

const produce = bindImmer<ProductsStore>();

export const useProductsStore = createSelectorFunctions<
  ProductsStore & ProductsComputed
>(
  create(
    computed<ProductsStore, ProductsComputed>(
      (set) => ({
        _products: [],
        filters: {
          search: "",
          sortBy: "",
          sortDir: "asc",
        },
        fetchProducts: async () => {
          const setLoading = useLoadingStore.setState;
          setLoading({ loading: true });

          const data = await mockResponse(getProductsList());
          set({ _products: data });

          setLoading({ loading: false });

          return data;
        },
        setFilters: (filters) => {
          set(
            produce((state) => {
              state.filters = {
                ...state.filters,
                ...filters,
              };
            })
          );
        },
      }),
      {
        products: ({ state }) => {
          if (!state?._products?.length) {
            state.fetchProducts();

            return [];
          }

          const { sortDir, sortBy, search } = state.filters;

          const sortedProducts = sortBy
            ? orderBy(state._products, sortBy, sortDir)
            : state._products;

          return sortedProducts.filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
          );
        },
      }
    )
  )
);
