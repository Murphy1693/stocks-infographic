// import socket from "./socket.ts"

import { NextApiHandler } from "next";

const hitSocket:NextApiHandler = (req, res) => {
  if (res.socket?.server?.io) {
    console.log(req.body);
    res.socket.server.io.emit("message", req.body)
    res.end();
  } else {
    res.status(500).end();
  }
}

export default hitSocket;