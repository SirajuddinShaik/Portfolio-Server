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
    category: {
      type: String,
      require: true,
    },
    revisedCount: Number,
    selected: Boolean,
    lastRevised: Date,
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
const testSchema = mongoose.Schema(
  {
    test: {
      type: String,
      unique: true,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
      required: true,
    },
    completed: {
      type: Boolean,
      require: true,
    },
    selected: {
      type: Boolean,
      require: true,
    },
  },
  { strict: false }
);

export const Test = mongoose.model("test", testSchema);
export const LearningForm = mongoose.model("learningform", learningFormSchema);
export const TodaysLearning = mongoose.model("daylearning", dayLearningSchema);
export const Category = mongoose.model("category", categorySchema);
