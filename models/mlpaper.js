import mongoose from "mongoose";

const mlPaperSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    refLink: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { strict: false }
);

export default mongoose.model("mlpaper", mlPaperSchema);
