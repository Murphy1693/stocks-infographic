export type finnhubSubscriptionObjects = {
  id: number;
  finnhub_symbol: string;
  display: string;
  alpha_symbol: string;
  crypto: boolean;
};

export const finnhubSubscriptions: finnhubSubscriptionObjects[] = [
  {
    id: 1,
    finnhub_symbol: "BINANCE:BTCUSDT",
    display: "BTC",
    alpha_symbol: "BTCUSD",
    crypto: true,
  },
  {
    id: 2,
    finnhub_symbol: "BINANCE:ETHUSDT",
    display: "ETH",
    alpha_symbol: "ETHUSD",
    crypto: true,
  },
  {
    id: 3,
    finnhub_symbol: "BINANCE:DOGEUSDT",
    display: "DOGE",
    alpha_symbol: "DOGEUSD",
    crypto: true,
  },
  {
    id: 4,
    finnhub_symbol: "ASTS",
    display: "ASTS",
    alpha_symbol: "ASTS",
    crypto: false,
  },
  {
    id: 5,
    finnhub_symbol: "AMZN",
    display: "AMZN",
    alpha_symbol: "AMZN",
    crypto: false,
  },
  {
    id: 6,
    finnhub_symbol: "TSLA",
    display: "Tesla",
    alpha_symbol: "TSLA",
    crypto: false,
  },
];
