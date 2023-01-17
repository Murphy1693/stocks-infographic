import axios from "axios";
import { Closing } from "../database";

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
        let stock = new Closing({
          symbol,
          price: response.data.results[0].c,
        });
        return stock.save();
      });
  }
};
