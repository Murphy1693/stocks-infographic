import { NextApiRequest, NextApiResponse } from "next";
import { Current } from "../../database";
import { selectCurrent } from "../../database/models";

const currentPriceHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await selectCurrent(req.query.finnhub_symbol)
    .then((queryResult) => {
      console.log(queryResult);
      res.json(queryResult.rows[0].data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default currentPriceHandler;
