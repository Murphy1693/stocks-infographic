import { useEffect, useState } from "react";
import TickerPrice from "./TickerPrice";
import { finnhubSubscriptions } from "../utils/finnhubSubscriptions";
import axios from "axios";
import { graphSubscribable, subscribable } from "../utils/subscription";

type TickerProps = {
  index: number,
  final?: boolean,
  tickerSubscriptions: subscribable
  graphSubscription: graphSubscribable
}

type closingStockShape = {
  _id: string,
  symbol: string,
  price: number,
  createdAt: Date,
  updatedAt: Date,
}

const Ticker = ( {index, final, tickerSubscriptions, graphSubscription}: TickerProps) => {
  const [tickerObject, setTickerObject] = useState(finnhubSubscriptions[index])
  const [closingPrice, setClosingPrice] = useState(0);
  const [selectState, setSelectState] = useState(0);

  useEffect(() => {
    graphSubscription.addTicker(setSelectState, tickerObject.alpha_symbol)
  }, [])

  useEffect(() => {
    if (selectState === 1) {
      graphSubscription.dispatch(tickerObject.alpha_symbol, tickerObject);
    }
  }, [selectState])

  // useEffect(() => {
  //   axios.get(`/api/closingPrice?alpha_symbol=${tickerObject.alpha_symbol}`).then((response) => {
  //     let stocks:closingStockShape[] = response.data;
  //     if (stocks[0].price) {
  //       setClosingPrice(stocks[0].price)
  //     }
  //   })
  // }, [tickerObject.finnhub_symbol])

  return <div
  onClick={() => {
    // if (tickerObject === finnhubSubscriptions[0]) {
    //   setTickerObject(finnhubSubscriptions[1])
    // } else {
    //   setTickerObject(finnhubSubscriptions[0])
    // }
    if (selectState === 0) {
      setSelectState(1);
    }
  }}
  className={
    // selectState ?
    // "relative text-white h-full w-1/5 p-4 min-w-[168px] shadow-[inset_0px_0px_20px_4px_rgba(239,68,222,0.3),_0px_0px_20px_4px_rgba(239,68,222,0.3)]" :
    // "relative text-white h-full w-1/5 border-r border-zinc-600 p-4 min-w-[168px]"
    selectState ?
    "relative text-white h-full w-1/5 p-4 min-w-[168px] border-b-2 border-[#9a5493]" :
    "relative text-white h-full w-1/5 border-r border-zinc-600 p-4 min-w-[168px] border-b-2 border-transparent"
  //   final
  //     ? "relative text-white h-full w-1/5 p-4 min-w-[168px] shadow-[inset_-5px_0px_20px_4px_rgba(255,0,0,0.3)]"
  //     : "relative text-white h-full w-1/5 border-r border-zinc-600 p-4 min-w-[168px]"
  }
>
  <div className="flex justify-between">
    <span>{tickerObject.display}</span>
    <TickerPrice tickerSubscriptions={tickerSubscriptions} symbol={tickerObject.finnhub_symbol} index={index} closingPrice={closingPrice}></TickerPrice>
  </div>
  <div>{closingPrice}</div>
  {/* {selectState === 1 ? <div className="flex justify-end text-sm text-yellow-200">Hello</div>: null} */}
  <div></div>
</div>
}

export default Ticker;
