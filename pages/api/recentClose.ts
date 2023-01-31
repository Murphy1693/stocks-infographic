import { NextApiRequest, NextApiResponse } from "next";
import { selectMostRecentClose } from "../../database/models";

const closingPriceHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.query.alpha_symbol !== undefined) {
    await selectMostRecentClose(req.query.alpha_symbol)
      .then((queryResult) => {
        res.json(queryResult.rows[0]);
      })
      .catch((err) => {
        res.status(500).end();
      });
  } else {
    res.status(500).end();
  }
};

export default closingPriceHandler;
