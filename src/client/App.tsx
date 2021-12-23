import React from "react";

import { GlobalStyles } from "./App.styled";
import Loader from "./components/Loader";
import Products from "./routes/Products/Products";
import { useLoadingStore } from "./stores/zustand/loadingStore";

const App = () => {
  const { loading } = useLoadingStore();

  return (
    <div>
      {loading ? <Loader /> : null}
      <GlobalStyles />
      <Products />
    </div>
  );
};

export default App;
