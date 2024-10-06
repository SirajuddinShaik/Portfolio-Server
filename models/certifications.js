import mongoose from "mongoose";

const certificationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    certificate: String,
    instructor: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    duration: {
      type: Number,
      require: true,
    },
    courseLink: {
      type: String,
      require: true,
    },
    difficulty: {
      type: String,
      require: true,
    },
    completeDateStr: {
      type: String,
      require: true,
    },
    completeDate: {
      type: Date,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    completionPercentage: {
      type: Number,
      require: true,
    },
  },
  { strict: false }
);

export default mongoose.model("certification", certificationSchema);
