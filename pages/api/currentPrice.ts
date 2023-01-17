import { NextApiRequest, NextApiResponse } from "next";
import { Current } from "../../database";

const currentPriceHandler = (req: NextApiRequest, res: NextApiResponse) => {
  Current.find({ symbol: req.query.symbol })
    .then((stocks) => {
      res.send(stocks);
    })
    .catch((err) => {
      res.status(500).end();
    });
};

export default currentPriceHandler;
