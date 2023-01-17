import FinnhubSocket, { priceContainer } from "./FinnhubSocket";
import { finnhubSubscriptions } from "./finnhubSubscriptions";

const recentlySaved: { [key: string]: boolean } = {};

finnhubSubscriptions.forEach((stockSymbolObject) => {
  recentlySaved[stockSymbolObject.symbol] = false;
});

// export const recordStocks = (payload: priceContainer) => {
//   for (const symbol in payload) {
//     if (recentlySaved[symbol] === false) {
//       recentlySaved[symbol] = true;
//       let x = new Current({
//         symbol: symbol,
//         price: payload[symbol],
//       });
//       x.save()
//         .then(() => {
//           setTimeout(() => {
//             recentlySaved[symbol] = false;
//             console.log(recentlySaved);
//           }, 30000);
//         })
//         .catch((err) => {
//           recentlySaved[symbol] = false;
//         });
//       }
//   }
// };
