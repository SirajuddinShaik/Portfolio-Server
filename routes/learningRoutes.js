import express from "express";
import {
  addTodaysLearning,
  getLearning,
  getSaveData,
  getTodaysLearning,
  setSaveData,
  addTest,
  getTest,
  completeTest,
  getRevision,
  completeRevision,
} from "../controller/learningController.js";

const router = express.Router();

router.post("/addToday", addTodaysLearning);
router.post("/getLearning", getLearning);
router.get("/getLearning", getLearning);
router.post("/addTest", addTest);
router.post("/completeTest", completeTest);
router.get("/getTest", getTest);
router.post("/saveData", setSaveData);
router.get("/saveData", getSaveData);
router.get("/getRevisionData", getRevision);
router.post("/completeRevision", completeRevision);
router.get("/", getTodaysLearning);

export default router;
