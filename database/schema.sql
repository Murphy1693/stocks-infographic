DROP DATABASE stocks;
CREATE DATABASE stocks;

\c stocks;

CREATE TABLE current_prices (
  id SERIAL PRIMARY KEY,
  display TEXT NOT NULL,
  alpha_symbol TEXT NOT NULL,
  finnhub_symbol TEXT NOT NULL,
  price DECIMAL NOT NULL,
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE closing_prices (
  id SERIAL PRIMARY KEY,
  display TEXT NOT NULL,
  alpha_symbol TEXT NOT NULL,
  finnhub_symbol TEXT NOT NULL,
  closing_price DECIMAL NOT NULL,
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);