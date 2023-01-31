import { create } from "domain";
import type { priceContainer } from "./FinnhubSocket";
import {
  finnhubSubscriptionObjects,
  finnhubSubscriptions,
} from "./finnhubSubscriptions";

type priceHandler = (price: number) => void;

type subscriptionValue = {
  symbol: string;
  callback: priceHandler;
};

type SubscriptionCallbacks = {
  [key: number]: subscriptionValue;
};

export type subscribable = {
  subscribe: (cb: priceHandler, stock: string, index: number) => () => void;
  getPayloadPrice: (symbol: string) => number;
  dispatch: (payload: priceContainer) => void;
};

export type tickerSelectSetter = (number: 0 | 1) => void;

export type graphSubscribable = {
  subscribe: (cb: (symbol: string) => void) => void;
  dispatch: (symbol: string, tickerObject: finnhubSubscriptionObjects) => void;
  addTicker: (cb: tickerSelectSetter, symbol: string) => void;
};

export type tickerSetterProps = { (data: 0 | 1): void };

export const createGraphSubscribable: () => graphSubscribable = () => {
  let graphCallback = (symbol: string) => {};
  let tickerSetters: { [key: string]: tickerSelectSetter } = {};
  return {
    subscribe: (cb) => {
      graphCallback = cb;
    },
    dispatch: (symbol, tickerObject) => {
      graphCallback(symbol);
      for (let k in tickerSetters) {
        if (symbol !== k) {
          tickerSetters[k](0);
        }
      }
    },
    addTicker: (cb: tickerSelectSetter, symbol: string) => {
      tickerSetters[symbol] = cb;
    },
  };
};

export const createSubscribable: () => subscribable = () => {
  const subscription: SubscriptionCallbacks = {};
  let payloadCopy: priceContainer = {};

  return {
    subscribe: (cb, symbol, index) => {
      subscription[index] = { symbol: symbol, callback: cb };
      return () => {
        delete subscription[index];
      };
    },

    getPayloadPrice: (symbol: string) => {
      return payloadCopy[symbol];
    },

    dispatch: (payload) => {
      payloadCopy = { ...payload };
      for (const index in subscription) {
        let symbol = subscription[index].symbol;
        let callback = subscription[index].callback;
        if (payload[symbol]) {
          callback(payload[symbol]);
        }
      }
    },
  };
};
