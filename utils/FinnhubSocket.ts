import { client as Client, connection, IUtf8Message } from "websocket";
import { Closing } from "../database";
import { selectAllMostCurrent } from "../database/models";
import "./cronjob";
import { finnhubSubscriptions } from "./finnhubSubscriptions";

const finnhubClient = new Client();

const finnhubSocketPromise = (): Promise<connection> => {
  return new Promise((resolve, reject) => {
    finnhubClient.connect(
      `wss://ws.finnhub.io?token=cesfcrqad3i2r4ra0nrgcesfcrqad3i2r4ra0ns0`
    );
    finnhubClient.on("connect", (connection: connection) => {
      if (connection) {
        resolve(connection);
      } else {
        reject();
      }
    });
  });
};

const finnhubConnection = finnhubSocketPromise();

type FinnhubMessage = {
  type: "ping" | "trade";
  data?: { s: string; p: number }[];
};

// export const addSubscription = (symbol: string) => {
//   finnhubConnection.then((connection: connection) => {
//     connection.send(JSON.stringify({ type: "subscribe", symbol: symbol }));
//   });
// };

// export const addMessageListener = (
//   callback: (parsedMsg: FinnhubMessage) => void
// ) => {
//   finnhubConnection.then((connection: connection) => {
//     connection.on("message", (msg) => {
//       let parsedData = JSON.parse((msg as IUtf8Message).utf8Data);
//       callback(parsedData);
//     });
//   });
// };

export type priceContainer = {
  [key: string]: number;
};

const payload: priceContainer = {};

type AllMostCurrentQueryObj = {
  price: number;
  stock_id: number;
  display: string;
  finnhub_symbol: string;
  time: string;
};

class FinnhubClient {
  constructor() {
    selectAllMostCurrent().then((queryResult) => {
      let current_prices: AllMostCurrentQueryObj[] = queryResult.rows;
      current_prices.forEach((priceObj) => {
        this.alterPayload(priceObj.finnhub_symbol, priceObj.price);
      });
    });
  }
  payload: priceContainer = {};

  addSubscription(symbol: string) {
    finnhubConnection.then((connection: connection) => {
      connection.send(JSON.stringify({ type: "subscribe", symbol: symbol }));
    });
  }

  addMessageListener(callback: (parsedMsg: FinnhubMessage) => void) {
    finnhubConnection.then((connection: connection) => {
      connection.on("message", (msg) => {
        let parsedData = JSON.parse((msg as IUtf8Message).utf8Data);
        callback(parsedData);
      });
    });
  }

  getPayload() {
    return { ...this.payload };
  }

  alterPayload(symbol: string, price: number) {
    this.payload[symbol] = price;
  }
}

let FinnhubSocket: FinnhubClient | undefined;

if (!FinnhubSocket) {
  FinnhubSocket = new FinnhubClient();
}
export default FinnhubSocket;
