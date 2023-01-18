import { NextApiRequest, NextApiResponse } from "next";
import FinnhubSocket from "../../utils/FinnhubSocket";

const payloadHandler = (req: NextApiRequest, res: NextApiResponse) => {
  res.json(FinnhubSocket!.getPayload());
};

export default payloadHandler;
