import FinnhubSocket, { priceContainer } from "./FinnhubSocket";
import { finnhubSubscriptions } from "./finnhubSubscriptions";
import { Closing, Current } from "../database";
import { MongooseError } from "mongoose";
import { insertCurrent } from "../database/models";

const recentlySaved: { [key: string]: boolean } = {};

finnhubSubscriptions.forEach((stockSymbolObject) => {
  recentlySaved[stockSymbolObject.finnhub_symbol] = false;
});

export const recordStocks = (payload: priceContainer, saveInterval: number) => {
  for (const symbol in payload) {
    if (recentlySaved[symbol] === false) {
      recentlySaved[symbol] = true;
      insertCurrent(symbol, payload[symbol])
        .then(() => {
          setTimeout(() => {
            recentlySaved[symbol] = false;
          }, saveInterval * 60 * 1000);
        })
        .catch((err) => {
          console.log(err);
          recentlySaved[symbol] = false;
        });
    }
  }
};
