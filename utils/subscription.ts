import { create } from "domain";
import type { priceContainer } from "../pages/api/socket";

type priceHandler = (price: number) => void;

type subscriptionValue = {
  symbol: string;
  callback: priceHandler;
};

type SubscriptionCallbacks = {
  [key: number]: subscriptionValue;
};

type subscribable = {
  subscribe: (cb: priceHandler, stock: string, index: number) => () => void;
  getPayloadPrice: (symbol: string) => number;
  dispatch: (payload: priceContainer) => void;
};

const createSubscribable: () => subscribable = () => {
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
      payloadCopy = payload;
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

const socketSubscriptions = createSubscribable();

export default socketSubscriptions;
