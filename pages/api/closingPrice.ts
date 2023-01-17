import { NextApiRequest, NextApiResponse } from "next";
import { Closing } from "../../database";

const closingPriceHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  Closing.find({ symbol: req.query.symbol })
    .sort({ createdAt: -1 })
    .limit(1)
    .then((closingStocks) => {
      res.json(closingStocks);
    })
    .catch((err) => {
      res.status(500).end();
    });
};

export default closingPriceHandler;
