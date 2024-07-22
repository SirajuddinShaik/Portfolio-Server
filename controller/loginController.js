import Login from "../models/portfoilio-login.js";
import bcrypt from "bcryptjs";

export const checkAuthentication = async (req, res) => {
  console.log(req);
  const { password } = req.body;
  const learnings = await Login.findById("owner");
  const authentication = await bcrypt.compare(password, learnings.password);
  let message;
  if (authentication) {
    message = "sucessful";
  } else {
    message = "Password Incorrect!";
  }
  res.status(200).json({ isAuthenticated: authentication, message: message });
};
