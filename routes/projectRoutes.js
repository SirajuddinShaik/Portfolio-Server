import express from "express";
import { getProjects, addProject } from "../controller/projectController.js";
const router = express.Router();

router.post("/add", addProject);
router.get("/", getProjects);

export default router;
