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
    category: {
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

const categorySchema = mongoose.Schema(
  {
    value: {
      type: String,
      require: true,
    },
    label: {
      type: String,
      require: true,
    },
  },
  { strict: false }
);

export const LearningForm = mongoose.model("learningform", learningFormSchema);
export const TodaysLearning = mongoose.model("daylearning", dayLearningSchema);
export const Category = mongoose.model("category", categorySchema);
