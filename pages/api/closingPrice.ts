import { NextApiRequest, NextApiResponse } from "next";
import { Closing, pool } from "../../database";
import { selectClosing } from "../../database/models";

const closingPriceHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // pool.query();
  // await Closing.find({ alpha_symbol: req.query.alpha_symbol })
  //   .sort({ createdAt: -1 })
  //   .limit(1)
  //   .then((closingStocks) => {
  //     res.json(closingStocks);
  //   })
  //   .catch((err) => {
  //     res.status(500).end();
  //   });
  if (req.query.alpha_symbol !== undefined) {
    await selectClosing(req.query.alpha_symbol)
      .then((queryResult) => {
        res.json(queryResult.rows[0].data);
      })
      .catch((err) => {
        res.status(500).end();
      });
  } else {
    res.status(500).end();
  }
};

export default closingPriceHandler;
