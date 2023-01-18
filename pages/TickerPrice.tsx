import { useState, useEffect } from "react";
import { subscribable } from "../utils/subscription";
// import { payload } from "./api/socket";

type TickerPriceProps = {
  symbol: string;
  index: number;
  closingPrice: number,
  tickerSubscriptions: subscribable
}

const TickerPrice = ( {symbol, index, closingPrice, tickerSubscriptions}: TickerPriceProps) => {
  const [price, setPrice] = useState(closingPrice);

  useEffect(() => {
    if (tickerSubscriptions.getPayloadPrice(symbol)) {
      setPrice(tickerSubscriptions.getPayloadPrice(symbol));
    }
    tickerSubscriptions?.subscribe(setPrice, symbol, index);
  }, [symbol]);

  return <div>{price}</div>
}

export default TickerPrice;