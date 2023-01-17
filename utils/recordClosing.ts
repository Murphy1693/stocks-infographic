import axios from "axios";
import { Closing } from "../database";
import { finnhubSubscriptions } from "./finnhubSubscriptions";

const recordClosing = (symbol: string, crypto: boolean) => {
  if (crypto) {
    return axios
      .get(
        `https://api.polygon.io/v2/aggs/ticker/X:${symbol}/prev?adjusted=true&apiKey=MAFIJzctcDN4y71NLpwc3uc3LsFZf_2b`
      )
      .then((response) => {
        let closing = new Closing({
          symbol,
          price: response.data.results[0].c,
        });
        return closing.save();
      });
  } else {
    return axios
      .get(
        `https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?adjusted=true&apiKey=MAFIJzctcDN4y71NLpwc3uc3LsFZf_2b`
      )
      .then((response) => {
        if (response.data.results[0].c) {
          let stock = new Closing({
            symbol,
            price: response.data.results[0].c,
          });
          return stock.save();
        }
      });
  }
};

let CLOSE_INTERVAL = false;
if (!CLOSE_INTERVAL) {
  CLOSE_INTERVAL = true;
  console.log("STARTING CLOSE INTERVAL");
  setInterval(() => {
    finnhubSubscriptions.forEach((subObject, i) => {
      setTimeout(() => {
        recordClosing(subObject.alpha_symbol, subObject.crypto)
          .then((stock) => {
            console.log(stock);
          })
          .catch((err) => {
            console.log(err);
          });
      }, i * 10000);
    });
  }, 60000);
}

export default null;
