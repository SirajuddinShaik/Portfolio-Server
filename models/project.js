import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    imgPath: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    link: {
      type: String,
      require: true,
    },
    demoLink: {
      type: String,
      require: true,
    },
    rank: {
      type: Number,
    },
    isBlog: {
      type: Boolean,
      require: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { strict: false }
);

export default mongoose.model("project", projectSchema);
