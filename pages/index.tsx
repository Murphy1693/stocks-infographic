import type { priceContainer } from './api/socket';
import io from "socket.io-client";
import Ticker from "./Ticker"
import socketSubscription from "../utils/subscription";

const socketInitializer = async () => {
  await fetch("/api/socket");
  const socket = io();

  socket.on("connect", () => {
    console.log("connected!");
  });
  socket.on("message", (payload:priceContainer) => {
    socketSubscription.dispatch(payload);
  })
};

socketInitializer();

const Home = () => {
  return (
    <div className="h-screen bg-slate-800">
      <div className="flex items-center h-20 bg-gradient-to-t from-slate-900 to-slate-700">
      <Ticker index={0} key={0}></Ticker>
      <Ticker index={1} key={1}></Ticker>
      <Ticker index={2} key={2}></Ticker>
      <Ticker index={3} key={3}></Ticker>
      <Ticker index={4} key={4}></Ticker>
      </div>
    </div>)

}

export default Home
