import { client as Client, connection, IUtf8Message } from "websocket";
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

export const addSubscription = (symbol: string) => {
  finnhubConnection.then((connection: connection) => {
    connection.send(JSON.stringify({ type: "subscribe", symbol: symbol }));
  });
};

export const addMessageListener = (
  callback: (parsedMsg: FinnhubMessage) => void
) => {
  finnhubConnection.then((connection: connection) => {
    connection.on("message", (msg) => {
      let parsedData = JSON.parse((msg as IUtf8Message).utf8Data);
      callback(parsedData);
    });
  });
};
