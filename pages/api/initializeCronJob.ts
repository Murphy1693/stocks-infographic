import axios from "axios";
import cron from "node-cron";
import { NextApiRequest, NextApiResponse } from "next";
import { Closing } from "../../database";
import { finnhubSubscriptions } from "../../utils/finnhubSubscriptions";

const recordClosingPrice = (symbol: string, crypto: boolean) => {
  if (crypto) {
    return axios
      .get(
        `https://api.polygon.io/v2/aggs/ticker/X:${symbol}/prev?adjusted=true&apiKey=MAFIJzctcDN4y71NLpwc3uc3LsFZf_2b`
      )
      .then((response) => {
        let closing = new Closing({
          symbol,
          price: response.data.results[0].c,
          time: response.data.results[0].t,
        });
        return closing.save();
      })
      .catch((err) => {
        console.log(err);
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
            time: response.data.results[0].t,
          });
          return stock.save();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const delay: (ms: number) => Promise<void> = (ms: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

finnhubSubscriptions.forEach(async (subObject, i) => {
  cron.schedule(`00 1,13 * * *`, async () => {
    await delay(i * 10000);
    console.log("HITTING ALPHA API");
    recordClosingPrice(subObject.alpha_symbol, subObject.crypto)
      .then((stock) => {
        console.log(stock);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

// cron.schedule("* 1 * * *", () => {
//   console.log("SCHEDULED!");
// });

// let CLOSE_INTERVAL = false;
// if (!CLOSE_INTERVAL) {
//   CLOSE_INTERVAL = true;
//   console.log("STARTING CLOSE INTERVAL");
//   setInterval(() => {
//     finnhubSubscriptions.forEach((subObject, i) => {
//       setTimeout(() => {
//         recordClosing(subObject.alpha_symbol, subObject.crypto)
//           .then((stock) => {
//             console.log(stock);
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       }, i * 10000);
//     });
//   }, 60000);
// }

const CloseHandler = (req: NextApiRequest, res: NextApiResponse) => {
  res.end();
};

export default CloseHandler;
