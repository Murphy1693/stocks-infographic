import { pool } from ".";
import {
  insertCurrentQuery,
  selectAllMostCurrentQuery,
  selectAllMostRecentCloseQuery,
  selectClosingQuery,
  selectCurrentQuery,
  selectMostRecentCloseQuery,
} from "./queryStrings";

type SQLSchema = {
  finnhub_symbol: string;
  alpha_symbol: string;
  price?: number;
  display: string;
  time: null | number;
  closing_price?: number;
};

export const selectClosing: (symbol: string, time: string) => Promise<any> = (
  symbol,
  time
) => {
  return pool.query(selectClosingQuery, [symbol, parseInt(time)]);
};

export const insertCurrent: (symbol: string, price: number) => Promise<any> = (
  symbol,
  price
) => {
  return pool.query(insertCurrentQuery, [symbol, price]);
};

export const selectCurrent: (symbol: string) => Promise<any> = (symbol) => {
  return pool.query(selectCurrentQuery, [symbol]);
};

export const selectMostRecentClose: (alpha_symbol: string) => Promise<any> = (
  alpha_symbol
) => {
  return pool.query(selectMostRecentCloseQuery, [alpha_symbol]);
};

export const selectAllMostRecentClose: () => Promise<any> = () => {
  return pool.query(selectAllMostRecentCloseQuery);
};

export const selectAllMostCurrent: () => Promise<any> = () => {
  return pool.query(selectAllMostCurrentQuery);
};
