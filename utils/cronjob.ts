import { finnhubSubscriptions } from "./finnhubSubscriptions";
import cron from "node-cron";
import recordClosingPrice from "./recordClosing";

const delay: (ms: number) => Promise<void> = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

finnhubSubscriptions.forEach(async (subObject, i) => {
  cron.schedule(`34 1,20 * * *`, async () => {
    await delay(i * 10000);
    recordClosingPrice(
      subObject.alpha_symbol,
      subObject.crypto,
      subObject.finnhub_symbol
    )
      .then((stock) => {
        console.log(stock);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

export default null;
