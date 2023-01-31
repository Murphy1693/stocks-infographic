export const selectClosingQuery: string = `
SELECT
  JSON_BUILD_OBJECT(
    'name', (SELECT display FROM stocks WHERE alpha_symbol = $1),
    'max', MAX(close),
    'min', MIN(close),
    'start', TO_TIMESTAMP(MIN(ordered_stocks.time)/1000)::date,
    'end', TO_TIMESTAMP(MAX(ordered_stocks.time)/1000)::date,
    'results', JSON_AGG(
      JSON_BUILD_OBJECT(
        'id', id,
        'price', close,
        'date', TO_TIMESTAMP(time/1000)::date
      )
    )
  ) as data
FROM
  (
    SELECT
      *
    FROM
      closing_prices
    WHERE
      stock_id = (SELECT id FROM stocks WHERE alpha_symbol = $1)
    AND
      time >= $2
    ORDER by
      time ASC
  )
ordered_stocks;
`;

export const insertCurrentQuery: string = `
INSERT INTO current_prices (stock_id, price) VALUES ((SELECT id FROM stocks WHERE finnhub_symbol = $1), $2);
`;

export const selectCurrentQuery: string = `
SELECT
  JSON_BUILD_OBJECT(
    'name', (SELECT display FROM stocks WHERE alpha_symbol = $1),
    'max', MAX(price),
    'min', MIN(price),
    'start', current_date,
    'end', MAX(time),
    'results', JSON_AGG(
      JSON_BUILD_OBJECT(
        'id', id,
        'price', price,
        'date', time
      )
    )
  ) as data
FROM
  (
    SELECT
      *
    FROM
      current_prices
    WHERE
      stock_id = (SELECT id FROM stocks WHERE alpha_symbol = $1)
    AND
      time > current_date
    ORDER BY
      TIME ASC
  ) ordered_stocks;
`;

export const selectAllMostRecentCloseQuery: string = `
SELECT
  close as closing_price,
  stock_id,
  display,
  finnhub_symbol,
  time
FROM
  (
    SELECT
      *,
      MAX(time) over (PARTITION BY stock_id) as max_times
    FROM
      closing_prices cp
    INNER JOIN
      stocks s
    ON
      cp.stock_id = s.id
  ) recent_close
WHERE
  time = max_times
ORDER BY
  stock_id;
`;

export const selectMostRecentCloseQuery: string = `
SELECT
  close as closing_price
FROM
  closing_prices
WHERE
  stock_id = (SELECT id FROM stocks WHERE alpha_symbol = $1)
AND
  time = (SELECT MAX(time) FROM closing_prices WHERE stock_id = (SELECT id FROM stocks WHERE alpha_symbol = $1))
`;

export const selectAllMostCurrentQuery: string = `
SELECT
  price,
  stock_id,
  display,
  finnhub_symbol,
  time
FROM
  (
    SELECT
      *,
      MAX(time) over (PARTITION BY stock_id) as max_times
    FROM
      current_prices cp
    INNER JOIN
      stocks s
    ON
      cp.stock_id = s.id
  ) recent_prices
WHERE
  time = max_times
ORDER BY
  stock_id;
`;

// SELECT extract(epoch from (current_date - INTERVAL '1 day')) AS yesterday_date;
