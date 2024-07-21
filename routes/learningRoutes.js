import express from "express";
import {
  addTodaysLearning,
  getLearning,
  getTodaysLearning,
} from "../controller/learningController.js";

const router = express.Router();

router.post("/addToday", addTodaysLearning);
router.post("/getLearning", getLearning);
router.get("/getLearning", getLearning);
router.get("/", getTodaysLearning);

export default router;
