import express from "express";
import {
  addTodaysLearning,
  getLearning,
  getSaveData,
  getTodaysLearning,
  setSaveData,
} from "../controller/learningController.js";

const router = express.Router();

router.post("/addToday", addTodaysLearning);
router.post("/getLearning", getLearning);
router.get("/getLearning", getLearning);
router.post("/saveData", setSaveData);
router.get("/saveData", getSaveData);
router.get("/", getTodaysLearning);

export default router;
