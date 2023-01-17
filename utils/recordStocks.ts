import FinnhubSocket, { priceContainer } from "./FinnhubSocket";
import { finnhubSubscriptions } from "./finnhubSubscriptions";
import { Closing, Current } from "../database";

const recentlySaved: { [key: string]: boolean } = {};

finnhubSubscriptions.forEach((stockSymbolObject) => {
  recentlySaved[stockSymbolObject.finnhub_symbol] = false;
});

export const recordStocks = (payload: priceContainer, saveInterval: number) => {
  for (const symbol in payload) {
    if (recentlySaved[symbol] === false) {
      recentlySaved[symbol] = true;
      let currentStock = new Current({
        symbol: symbol,
        price: payload[symbol],
      });
      currentStock
        .save()
        .then(() => {
          setTimeout(() => {
            recentlySaved[symbol] = false;
            console.log(recentlySaved);
          }, saveInterval * 60 * 1000);
        })
        .catch((err) => {
          recentlySaved[symbol] = false;
        });
    }
  }
};
