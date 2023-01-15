import { useState, useEffect } from "react";
import socketSubscription from "../utils/subscription";
// import { payload } from "./api/socket";

type TickerPriceProps = {
  symbol: string;
  index: number;
}

const TickerPrice = ( {symbol, index}: TickerPriceProps) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setPrice(socketSubscription.getPayloadPrice(symbol));
    socketSubscription.subscribe(setPrice, symbol, index);
  }, [symbol]);

  return <div>{price}</div>
}

export default TickerPrice;