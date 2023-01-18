import axios from "axios";
import { Closing } from "../database";

const recordClosingPrice = (
  alpha_symbol: string,
  crypto: boolean,
  finnhub_symbol: string
) => {
  if (crypto) {
    return axios
      .get(
        `https://api.polygon.io/v2/aggs/ticker/X:${alpha_symbol}/prev?adjusted=true&apiKey=MAFIJzctcDN4y71NLpwc3uc3LsFZf_2b`
      )
      .then((response) => {
        let closing = new Closing({
          alpha_symbol,
          finnhub_symbol,
          time: response.data.results[0].t,
          price: response.data.results[0].c,
        });
        return closing.save();
      });
  } else {
    return axios
      .get(
        `https://api.polygon.io/v2/aggs/ticker/${alpha_symbol}/prev?adjusted=true&apiKey=MAFIJzctcDN4y71NLpwc3uc3LsFZf_2b`
      )
      .then((response) => {
        if (response.data.results[0].c) {
          let stock = new Closing({
            alpha_symbol,
            finnhub_symbol,
            time: response.data.results[0].t,
            price: response.data.results[0].c,
          });
          return stock.save();
        }
      });
  }
};

export default recordClosingPrice;
