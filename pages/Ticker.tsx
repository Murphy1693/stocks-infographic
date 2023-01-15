import { useEffect, useState } from "react";
import TickerPrice from "./TickerPrice";

type TickerProps = {
  symbol: string,
  index: number,
  final?: boolean
}

let arr = ["BINANCE:BTCUSDT", "BINANCE:ETHUSDT", "BINANCE:DOGEUSDT"]

const Ticker = ( {symbol, index, final}: TickerProps) => {
  const [word, setWord] = useState(arr[index])
  const [price, setPrice] = useState(0);

  return <div
  onClick={() => {
    if (word === "BINANCE:BTCUSDT") {
      setWord("BINANCE:ETHUSDT");
    } else {
      setWord("BINANCE:BTCUSDT");
    }
  }}
  className={
    final
      ? "relative text-white h-full w-1/5 p-4 min-w-[168px]"
      : "relative text-white h-full w-1/5 border-r border-zinc-600 p-4 min-w-[168px]"
  }
>
  <div className="flex justify-between">
    <span>{index}</span>
    <TickerPrice symbol={word} index={index}></TickerPrice>
  </div>
</div>
}

export default Ticker;
