DROP DATABASE stocks;
CREATE DATABASE stocks;

\c stocks;

CREATE TABLE stocks (
  id SERIAL PRIMARY KEY,
  display TEXT NOT NULL,
  alpha_symbol TEXT NOT NULL,
  finnhub_symbol TEXT NOT NULL,
  yahoo_symbol TEXT UNIQUE NOT NULL,
  crypto BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE current_prices (
  id SERIAL PRIMARY KEY,
  stock_id INT,
  CONSTRAINT fk_stock_id
  FOREIGN KEY(stock_id)
  REFERENCES "stocks"(id),
  price DECIMAL NOT NULL,
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE closing_prices (
  id SERIAL PRIMARY KEY,
  stock_id INT,
  CONSTRAINT fk_stock_id
  FOREIGN KEY(stock_id)
  REFERENCES "stocks"(id),
  time BIGINT NOT NULL,
  close DECIMAL NOT NULL,
  open DECIMAL DEFAULT NULL,
  high DECIMAL DEFAULT NULL,
  low DECIMAL DEFAULT NULL,
  adj_close DECIMAL DEFAULT NULL,
  volume BIGINT DEFAULT NULL
);

CREATE INDEX closing_time_idx ON closing_prices(time);
CREATE INDEX current_time_idx ON current_prices(time);
