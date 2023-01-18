import { useEffect, useState } from "react";
import TickerPrice from "./TickerPrice";
import { finnhubSubscriptions } from "../utils/finnhubSubscriptions";
import axios from "axios";
import { subscribable } from "../utils/subscription";

type TickerProps = {
  index: number,
  final?: boolean,
  tickerSubscriptions: subscribable
}

type closingStockShape = {
  _id: string,
  symbol: string,
  price: number,
  createdAt: Date,
  updatedAt: Date,
}

const Ticker = ( {index, final, tickerSubscriptions}: TickerProps) => {
  const [tickerObject, setTickerObject] = useState(finnhubSubscriptions[index])
  const [closingPrice, setClosingPrice] = useState(0);

  useEffect(() => {
    axios.get(`/api/closingPrice?alpha_symbol=${tickerObject.alpha_symbol}`).then((response) => {
      let stocks:closingStockShape[] = response.data;
      if (stocks[0].price) {
        setClosingPrice(stocks[0].price)
      }
    })
  }, [tickerObject.finnhub_symbol])

  return <div
  onClick={() => {
    if (tickerObject === finnhubSubscriptions[0]) {
      setTickerObject(finnhubSubscriptions[1])
    } else {
      setTickerObject(finnhubSubscriptions[0])
    }
  }}
  className={
    final
      ? "relative text-white h-full w-1/5 p-4 min-w-[168px]"
      : "relative text-white h-full w-1/5 border-r border-zinc-600 p-4 min-w-[168px]"
  }
>
  <div className="flex justify-between">
    <span>{tickerObject.display}</span>
    <TickerPrice tickerSubscriptions={tickerSubscriptions} symbol={tickerObject.finnhub_symbol} index={index} closingPrice={closingPrice}></TickerPrice>
  </div>
  <div>{closingPrice}</div>
</div>
}

export default Ticker;
