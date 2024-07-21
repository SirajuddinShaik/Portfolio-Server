import mongoose from "mongoose";

const dayLearningSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    str_date: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { strict: false }
);

export default mongoose.model("daylearning", dayLearningSchema);
