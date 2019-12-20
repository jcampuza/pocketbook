import { useState } from 'react';

type StateInitializer<T> = T | (() => T);

export const useReactState = <T>(stateInit: StateInitializer<T>) => {
  const [state, setState] = useState(stateInit);

  const updateState = (slice: Partial<T>) =>
    setState(curr => ({
      ...curr,
      ...slice,
    }));

  return [state, updateState] as const;
};
