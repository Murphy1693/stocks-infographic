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
  const [price, setPrice] = useState(0);
  const [closingPrice, setClosingPrice] = useState(0);
  const [selectState, setSelectState] = useState(0);

  let difference = (price - closingPrice)

  useEffect(() => {
    graphSubscription.addTicker(setSelectState, tickerObject.alpha_symbol)
  }, [])

  useEffect(() => {
    if (selectState === 1) {
      graphSubscription.dispatch(tickerObject.alpha_symbol, tickerObject);
    }
  }, [selectState])

  useEffect(() => {
    fetch(`/api/recentClose?alpha_symbol=${tickerObject.alpha_symbol}`).then(async (data) => {
      let x = await data.json();
      x = parseFloat(x.closing_price).toFixed(2);
      setClosingPrice(x);
    })
    if (tickerSubscriptions.getPayloadPrice(tickerObject.finnhub_symbol)) {
      setPrice(tickerSubscriptions.getPayloadPrice(tickerObject.finnhub_symbol));
    }
    tickerSubscriptions?.subscribe(setPrice, tickerObject.finnhub_symbol, index);
  }, [tickerObject.finnhub_symbol])

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
    if (selectState === 0) {
      setSelectState(1);
    }
  }}
  className={
    // selectState ?
    // "relative text-white h-full w-1/5 p-4 min-w-[168px] shadow-[inset_0px_0px_20px_4px_rgba(239,68,222,0.3),_0px_0px_20px_4px_rgba(239,68,222,0.3)]" :
    // "relative text-white h-full w-1/5 border-r border-zinc-600 p-4 min-w-[168px]"
    //border-b border-[#9a5493]
    selectState ?
    "relative text-xs text-center text-purple-400 h-full w-1/5 p-2 min-w-[3rem] md:text-sm md:text-start md:p-4 border-r border-zinc-600" :
    "relative text-xs text-center text-white h-full w-1/5 border-r border-zinc-600 p-2 min-w-[3rem] md:text-sm md:text-start md:p-4"
  //   final
  //     ? "relative text-white h-full w-1/5 p-4 min-w-[168px] shadow-[inset_-5px_0px_20px_4px_rgba(255,0,0,0.3)]"
  //     : "relative text-white h-full w-1/5 border-r border-zinc-600 p-4 min-w-[168px]"
  }
>
  <div className="flex justify-between flex-col md:flex-row">
    <span>{tickerObject.display}</span>
    <div className="text-white">{price}</div>
    {/* <TickerPrice tickerSubscriptions={tickerSubscriptions} symbol={tickerObject.finnhub_symbol} index={index} closingPrice={closingPrice}></TickerPrice> */}
  </div>
  <div className={difference >= 0 ? 'text-green-400' : 'text-red-400'}>{difference >= 0 ? '+' + difference.toFixed(2) : difference.toFixed(2)}</div>
  {/* {selectState === 1 ? <div className="flex justify-end text-sm text-yellow-200">Hello</div>: null} */}
  <div></div>
</div>
}

export default Ticker;
