import faker from "faker";

import { Product } from "./interfaces";

export const getProduct = (): Product => ({
  name: faker.company.companyName(),
  id: faker.datatype.uuid(),
  price: faker.datatype.number(5000),
  image: `https://loremflickr.com/500/500/dog?lock=${faker.datatype.number(
    200
  )}`,
});

export const getProductsList = (count?: number) =>
  [...Array(count ?? 200)].map(getProduct);
