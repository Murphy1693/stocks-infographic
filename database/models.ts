import { pool } from ".";
import { closingQuery } from "./queryStrings";

type SQLSchema = {
  finnhub_symbol: string;
  alpha_symbol: string;
  price?: number;
  display: string;
  time: null | number;
  closing_price?: number;
};

export const insertCurrent: (obj: SQLSchema) => Promise<any> = ({
  display,
  alpha_symbol,
  finnhub_symbol,
  price,
}) =>
  pool.query(
    `INSERT INTO current_prices (display, alpha_symbol, finnhub_symbol, price) VALUES ($1, $2, $3, $4)`,
    [display, alpha_symbol, finnhub_symbol, price]
  );

export const insertClosing: (obj: SQLSchema) => Promise<any> = ({
  display,
  alpha_symbol,
  finnhub_symbol,
  closing_price,
  time,
}) => {
  return pool.query(
    `INSERT INTO current_prices (display, alpha_symbol, finnhub_symbol, closing_price, time) VALUES ($1, $2, $3, $4, $5)`,
    [display, alpha_symbol, finnhub_symbol, closing_price, time]
  );
};

export const selectClosing: (symbol: string) => Promise<any> = (symbol) => {
  return pool.query(closingQuery, [symbol]);
};
// export const insertClosing = (obj: SQLSchema) => {
//   pool.query(insertQuery, )
// };

// export const insertCurrent = (obj: SQLSchema) => {};
