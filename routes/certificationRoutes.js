import express from "express";
import {
  addCertification,
  getCertifications,
} from "../controller/certificationController.js";

const Router = express.Router();

Router.get("/", getCertifications);
Router.post("/add", addCertification);

export default Router;
