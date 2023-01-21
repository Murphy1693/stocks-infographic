type finnhubSubscriptionObjects = {
  finnhub_symbol: string;
  display: string;
  alpha_symbol: string;
  crypto: boolean;
};

export const finnhubSubscriptions: finnhubSubscriptionObjects[] = [
  {
    finnhub_symbol: "BINANCE:BTCUSDT",
    display: "BTC",
    alpha_symbol: "BTCUSD",
    crypto: true,
  },
  {
    finnhub_symbol: "BINANCE:ETHUSDT",
    display: "ETH",
    alpha_symbol: "ETHUSD",
    crypto: true,
  },
  {
    finnhub_symbol: "BINANCE:DOGEUSDT",
    display: "DOGE",
    alpha_symbol: "DOGEUSD",
    crypto: true,
  },
  {
    finnhub_symbol: "ASTS",
    display: "ASTS",
    alpha_symbol: "ASTS",
    crypto: false,
  },
  {
    finnhub_symbol: "AMZN",
    display: "AMZN",
    alpha_symbol: "AMZN",
    crypto: false,
  },
];
