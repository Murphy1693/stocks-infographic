import { NextApiRequest, NextApiResponse } from "next";
import { Closing } from "../../database";

const closingPriceHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await Closing.find({ alpha_symbol: req.query.alpha_symbol })
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
