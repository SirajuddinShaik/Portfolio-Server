import mongoose from "mongoose";

const loginSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { strict: false }
);

export default mongoose.model("login", loginSchema);
