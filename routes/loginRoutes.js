import express from "express";
import { checkAuthentication } from "../controller/loginController.js";

const Router = express.Router();

Router.post("/",checkAuthentication);

export default Router;