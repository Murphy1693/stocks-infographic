import { Server } from "socket.io";
import { NextApiRequest, NextApiResponse } from "next";
import { client, Message } from "websocket";
const finnhubClient = new client();

let frontendSocket = new Server();

export type priceContainer = {
  [key: string]: number;
};

type FinnhubMessage = {
  type: "ping" | "trade";
  data?: { s: string; p: number }[];
};

export const payload: priceContainer = {};

finnhubClient.on("connectFailed", (err) => {
  console.log(err);
});

finnhubClient.on("connect", function (connection) {
  console.log("Connection with finnhub established!");
  connection.on("message", (data: Message) => {
    if ("utf8Data" in data) {
      let newData: FinnhubMessage = JSON.parse(data.utf8Data);
      if (frontendSocket && newData.data) {
        newData.data.forEach((tradeInstance) => {
          payload[tradeInstance.s] = tradeInstance.p;
        });
        frontendSocket.emit("message", payload);
      } else {
        console.log("frontendSocket undefined");
      }
    } else {
      console.log("invalid message from finnhub");
      return;
    }
  });
  connection.send(JSON.stringify({ type: "subscribe", symbol: "AMZN" }));
  connection.send(JSON.stringify({ type: "subscribe", symbol: "ASTS" }));
  connection.send(
    JSON.stringify({ type: "subscribe", symbol: "BINANCE:DOGEUSDT" })
  );
  connection.send(
    JSON.stringify({ type: "subscribe", symbol: "BINANCE:ETHUSDT" })
  );
  connection.send(
    JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCUSDT" })
  );
});

finnhubClient.connect(
  `wss://ws.finnhub.io?token=${process.env.FINNHUB_API_KEY}`
);

const SocketHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (res.socket.server.io) {
    console.log("running");
  } else {
    console.log("starting socket");
    frontendSocket.listen(res.socket.server);
    res.socket.server.io = frontendSocket;
    // abc = new Server(res.socket.server);
    // res.socket.server.io = abc;

    // finnhubClient.on("connectFailed", (err) => {
    //   console.log(err)
    // })

    // finnhubClient.on("connect", function (connection) {
    //   console.log("Connection with finnhub established!");
    //   connection.on("message", function (message) {
    //     message = JSON.parse(message.utf8Data);
    //     if (abc) {
    //       abc.emit("message", message);
    //     } else {
    //       console.log("abc undefined")
    //     }
    //   });
    //   connection.send(JSON.stringify({ type: "subscribe", symbol: "AMZN" }));
    //   connection.send(JSON.stringify({ type: "subscribe", symbol: "ASTS" }));
    //   connection.send(
    //     JSON.stringify({ type: "subscribe", symbol: "BINANCE:DOGEUSDT" })
    //   );
    //   connection.send(
    //     JSON.stringify({ type: "subscribe", symbol: "BINANCE:ETHUSDT" })
    //   );
    //   connection.send(
    //     JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCUSDT" })
    //   );
    // });
    // finnhubClient.connect(
    //   `wss://ws.finnhub.io?token=cesfcrqad3i2r4ra0nrgcesfcrqad3i2r4ra0ns0`
    // );
  }
  res.end();
};

export default SocketHandler;
