import produce, { Draft } from "immer";

export const bindImmer =
  <T>() =>
  (recipe: (state: Draft<T>) => void) =>
    produce<T>(recipe);
