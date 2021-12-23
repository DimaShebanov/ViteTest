import { StateCreator } from "zustand";

import {
  Computed,
  CustomSetState,
  CustomStateCreator,
  Subscribers,
} from "./computed.interfaces";

const getSubscribers = <TComputed, TState>(
  computedProps: Computed<TComputed, TState>
) => {
  type CompKey = keyof TComputed;
  const reg = new RegExp(/(?:state\.)(\w+)/g);
  const reg2 = new RegExp(/(?:state\[["'])(\w+)(?:["']\])/g);

  return Object.fromEntries(
    Object.entries<typeof computedProps[CompKey]>(computedProps).map(
      ([key, fn]) => {
        const fnString = fn.toString();
        const matches = [
          ...fnString.matchAll(reg),
          ...fnString.matchAll(reg2),
        ].map(([, sub]) => sub);

        return [key, matches];
      }
    )
  ) as Subscribers<TComputed, TState>;
};

export const computed = <TState extends object, TComputed extends object>(
  stateCreator: CustomStateCreator<TState, TComputed>,
  computedProps: Computed<TComputed, TState>
): StateCreator<TState & TComputed> => {
  const middleware: CustomStateCreator<TState, TComputed> = (set, get, api) => {
    type State = TState & TComputed;
    const subscribers = getSubscribers(computedProps);
    type SubscribersType = typeof subscribers;

    const getComputedState = (
      changedChunk: Partial<TState>,
      currentState?: State
    ): Partial<State> => {
      const fullState = { ...(currentState || {}), ...changedChunk } as State;
      const computedResult = {} as TComputed;

      Object.entries<SubscribersType[keyof SubscribersType]>(
        subscribers
      ).forEach(([sKey, props]) => {
        const subscriber = sKey as keyof SubscribersType;

        if (props.some((prop) => prop in changedChunk)) {
          computedResult[subscriber] = computedProps[subscriber]({
            state: fullState,
          });
        }
      });

      return computedResult;
    };

    const customSet: CustomSetState<TState> = (newState, replace) => {
      set(newState, replace);
      Promise.resolve().then(() => {
        const currentState = get();
        const result =
          typeof newState === "function" ? newState(currentState) : newState;
        const computedState = getComputedState(result, currentState);

        set(computedState);
      });
    };

    const createdState = stateCreator(customSet, get, api);

    return { ...createdState, ...getComputedState(createdState) } as State;
  };

  return middleware as StateCreator<TState & TComputed>;
};
