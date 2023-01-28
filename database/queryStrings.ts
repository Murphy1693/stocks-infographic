export const closingQuery: string = `
SELECT
  JSON_BUILD_OBJECT(
    'name', (SELECT display FROM stocks WHERE alpha_symbol = $1),
    'max', MAX(close),
    'start', TO_TIMESTAMP(MIN(ordered_stocks.time)/1000)::date,
    'end', TO_TIMESTAMP(MAX(ordered_stocks.time)/1000)::date,
    'results', JSON_AGG(
      JSON_BUILD_OBJECT(
        'id', id,
        'close', close,
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
    ORDER by
      time ASC
  )
ordered_stocks;
`;
