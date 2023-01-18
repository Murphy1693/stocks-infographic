import { NextApiRequest, NextApiResponse } from "next";
import { Current } from "../../database";

const currentPriceHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await Current.find({ symbol: req.query.symbol })
    .then((stocks) => {
      res.send(stocks);
    })
    .catch((err) => {
      res.status(500).end();
    });
};

export default currentPriceHandler;
