import type { priceContainer } from '../utils/FinnhubSocket';
import io from "socket.io-client";
import Ticker from "./Ticker"
import { subscribable, createSubscribable } from '../utils/subscription';
import { useEffect, useMemo, useState, createContext, useRef } from 'react';
import LineGraph, { options, aapl } from "./../graph"
import { sampleData } from '../data/sample_graph';

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

let newOptions = {...options}
newOptions.x = (d: any) => d.x;
newOptions.y = (d: any) => d.y;

const Home = () => {
  const graphRef = useRef(null);
  useEffect(() => {
    fetchSocket(socketSubscription);
    options.color = "#9a5493";
    LineGraph(graphRef.current, sampleData, newOptions)
  }, []);

  return (
    <div className="h-screen bg-slate-800 ">
      <div className="flex items-center h-20 bg-gradient-to-t from-slate-900 to-slate-700">
      <Ticker index={0} key={0} tickerSubscriptions={socketSubscription}></Ticker>
      <Ticker index={1} key={1} tickerSubscriptions={socketSubscription}></Ticker>
      <Ticker index={2} key={2} tickerSubscriptions={socketSubscription}></Ticker>
      <Ticker index={3} key={3} tickerSubscriptions={socketSubscription}></Ticker>
      <Ticker index={4} key={4} tickerSubscriptions={socketSubscription}></Ticker>
      </div>
      <div className="flex items-center" ref={graphRef}></div>
    </div>)

}

export default Home
