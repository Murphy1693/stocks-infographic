import { useEffect, useState } from "react";
import TickerPrice from "./TickerPrice";
import { finnhubSubscriptions } from "../utils/finnhubSubscriptions";
import axios from "axios";

type TickerProps = {
  index: number,
  final?: boolean
}

type closingStockShape = {
  _id: string,
  symbol: string,
  price: number,
  createdAt: Date,
  updatedAt: Date,
}

const Ticker = ( {index, final}: TickerProps) => {
  const [tickerObject, setTickerObject] = useState(finnhubSubscriptions[index])
  const [price, setPrice] = useState(0);
  const [closingPrice, setClosingPrice] = useState(0);

  useEffect(() => {
    axios.get(`/api/closingPrice?symbol=${tickerObject.alpha_symbol}`).then((response) => {
      let stocks:closingStockShape[] = response.data;
      setClosingPrice(stocks[0].price)
    })
  })

  return <div
  onClick={() => {
    if (tickerObject.finnhub_symbol === "BINANCE:BTCUSDT") {
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
    <TickerPrice symbol={tickerObject.finnhub_symbol} index={index}></TickerPrice>
  </div>
  <div>{closingPrice}</div>
</div>
}

export default Ticker;
