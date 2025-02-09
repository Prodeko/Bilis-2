"use client";

import type React from "react";
import { createContext, useContext, useEffect, useReducer } from "react";

import type { Player } from "@common/types";

import { type Action, type State, setQueue } from "./reducer";

const initialState: Player[] = [];

const QueueContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type QueueProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

/**
 * Provides queue to the children of this provider.
 *
 * @param object - Object of Queue-reducer and react children
 * @returns Global state provider for queue
 */
export const QueueProvider = ({ reducer, children }: QueueProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch(setQueue());
  }, []);

  return (
    <QueueContext.Provider value={[state, dispatch]}>
      {children}
    </QueueContext.Provider>
  );
};
export const useQueueState = () => useContext(QueueContext);
