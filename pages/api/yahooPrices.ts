import yahooFinance from "yahoo-finance";

const getYahooPrices = (symbol) => {
  return new Promise((resolve, reject) => {
    yahooFinance.historical(
      {
        symbol: symbol,
        from: "2023-01-01",
        to: "2023-01-22",
        period: "d",
      },
      (err, quotes) => {
        if (err) {
          reject(err);
        } else {
          resolve(quotes);
        }
      }
    );
  });
};

const yahooPriceHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await getYahooPrices(req.query.symbol)
    .then((quotes) => {
      res.json(quotes);
    })
    .catch((err) => {
      res.status(500).end();
    });

  // await getYahooPrices(req.query.symbol)
  //   .then((quotes) => {
  //     res.json(quotes);
  //   })
  //   .catch((err) => {
  //     res.status(500).end();
  //   });
};

export default yahooPriceHandler;
