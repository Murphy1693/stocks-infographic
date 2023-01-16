import { Server as SocketIOServer } from "socket.io";
import { NextApiRequest, NextApiResponse } from "next";
import { client, Message } from "websocket";
import socketSubscriptions from "../../utils/subscription";
import { finnhubSubscriptions } from "../../utils/finnhubSubscriptions";
import http from "http";
import { addMessageListener, addSubscription } from "../../utils/FinnhubSocket";

export type priceContainer = {
  [key: string]: number;
};

const frontendSocket = new SocketIOServer();

const payload: priceContainer = {};

addMessageListener((msg) => {
  msg.data?.forEach((tradeInstance) => {
    payload[tradeInstance.s] = tradeInstance.p;
  });
  frontendSocket.emit("message", payload);
});

finnhubSubscriptions.forEach((subscriptionObject) => {
  addSubscription(subscriptionObject.symbol);
});

type ExtendedHttpServer = http.Server & {
  io: SocketIOServer;
};

type ExtendedNextApiResponse = NextApiResponse & {
  socket: {
    server: http.Server | ExtendedHttpServer;
  };
};

const SocketHandler = (req: NextApiRequest, res: ExtendedNextApiResponse) => {
  if (!("io" in res.socket.server)) {
    console.log("starting socket");
    frontendSocket.listen(res.socket.server);
    (res.socket.server as ExtendedHttpServer).io = frontendSocket;
  }
  res.end();
};

export default SocketHandler;
