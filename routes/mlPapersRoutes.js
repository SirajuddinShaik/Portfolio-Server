import express from "express";

const Router = express.Router();
import { addMlPaper, getMlPapers } from "../controller/mlPaperController.js";

Router.post("/add", addMlPaper);
Router.get("/", getMlPapers);

export default Router;
