import pg from "pg";

type SQLSchema = {
  finnhub_symbol: string;
  alpha_symbol: string;
  price: number;
  display: string;
  time: null | number;
  closing_price?: number;
};

export const insertClosing = (obj: SQLSchema) => {};

export const insertCurrent = (obj: SQLSchema) => {};
