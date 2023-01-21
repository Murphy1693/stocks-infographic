type sampleDataType = {
  x: number;
  y: number;
}[];

let now = new Date();

export const sampleData = [
  {
    x: new Date(now.getTime() - 1000 * 60 * 60 * 108),
    y: 0,
  },
  {
    x: new Date(now.getTime() - 1000 * 60 * 60 * 72),
    y: 4,
  },
  {
    x: new Date(now.getTime() - 1000 * 60 * 60 * 48),
    y: 5,
  },
  {
    x: new Date(now.getTime() - 1000 * 60 * 60 * 24),
    y: 1,
  },
  {
    x: now,
    y: 3,
  },
];

// export const sampleData2 = [
//   {
//     finnhub_symbol: "AMZN",
//     price: 97.37,
//     createdAt: ISODate("2023-01-21T00:46:29.614Z"),
//     updatedAt: ISODate("2023-01-21T00:46:29.614Z"),
//     __v: 0,
//   },
//   {
//     finnhub_symbol: "AMZN",
//     price: 95.46,
//     createdAt: ISODate("2023-01-21T00:41:29.222Z"),
//     updatedAt: ISODate("2023-01-21T00:41:29.222Z"),
//     __v: 0,
//   },
// ];
