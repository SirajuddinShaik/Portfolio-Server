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

export const TodaysLearning = mongoose.model("daylearning", dayLearningSchema);

const learningFormSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    link: {
      type: String,
    },
  },
  { strict: false }
);

export const LearningForm = mongoose.model("learningform", learningFormSchema);
