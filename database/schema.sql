CREATE DATABASE IF NOT EXISTS stocks;

USE stocks;

CREATE TABLE current_prices (
  id PRIMARY KEY SERIAL,
  display TEXT NOT NULL,
  alpha_symbol TEXT NOT NULL,
  finnhub_symbol TEXT NOT NULL,
  price DECIMAL NOT NULL,
  time DATETIME DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE closing_prices (
  id PRIMARY KEY SERIAL,
  display TEXT NOT NULL,
  alpha_symbol TEXT NOT NULL,
  finnhub_symbol TEXT NOT NULL,
  closing_price DECIMAL NOT NULL,
  time DATETIME DEFAULT CURRENT_TIMESTAMP()
);