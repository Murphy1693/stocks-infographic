import type { priceContainer } from '../utils/FinnhubSocket';
import io from "socket.io-client";
import Ticker from "./Ticker"
import { subscribable, createSubscribable, createGraphSubscribable } from '../utils/subscription';
import { useEffect, useMemo, useState, createContext, useRef, useReducer } from 'react';
import LineGraph, { options, aapl } from "./../graph"
import { sampleData } from '../data/sample_graph';
import Graph from "./Graph"

let fetchSocket = async (subscription: subscribable) => {
  await fetch("http://localhost:3000/api/socket")
    console.log("HELLO WORLD")
    const socket = io();
    socket.on("connect", () => {
      console.log("connected!");
    });
    socket.on("message", (payload:priceContainer) => {
      subscription.dispatch(payload);
    })
}

const socketSubscription = createSubscribable();
const graphSubscription = createGraphSubscribable();

let newOptions = {...options}
newOptions.x = (d: any) => new Date(d.date);
newOptions.y = (d: any) => d.close;


const Home = () => {
  const [app, setApp] = useState(null);
  const graphRef = useRef(null);

  useEffect(() => {
    fetchSocket(socketSubscription);
  }, []);

  return (
    <div className="h-screen bg-slate-800 min-w-[300px]">
      <div className="flex items-center h-20 bg-gradient-to-t from-slate-900 to-slate-700">
      <Ticker index={0} key={0} tickerSubscriptions={socketSubscription} graphSubscription={graphSubscription}></Ticker>
      <Ticker index={1} key={1} tickerSubscriptions={socketSubscription} graphSubscription={graphSubscription}></Ticker>
      <Ticker index={5} key={2} tickerSubscriptions={socketSubscription} graphSubscription={graphSubscription}></Ticker>
      <Ticker index={3} key={3} tickerSubscriptions={socketSubscription} graphSubscription={graphSubscription}></Ticker>
      <Ticker index={4} key={4} tickerSubscriptions={socketSubscription} graphSubscription={graphSubscription}></Ticker>
      </div>
      <Graph graphSubscription={graphSubscription}></Graph>
      {/* <div ref={graphRef}></div> */}
    </div>)

}

export default Home
