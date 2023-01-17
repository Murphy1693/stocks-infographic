import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/stocks").then(() => {
  console.log("Connected to mongodb");
});

export const Current =
  mongoose.models.Current ||
  mongoose.model(
    "Current",
    new mongoose.Schema(
      {
        display: String,
        symbol: { type: String, required: true, index: true },
        price: Number,
      },
      { timestamps: true }
    )
  );

export const Closing =
  mongoose.models.Closing ||
  mongoose.model(
    "Closing",
    new mongoose.Schema(
      {
        symbol: { type: String, required: true, index: true },
        price: Number,
      },
      { timestamps: true }
    )
  );
