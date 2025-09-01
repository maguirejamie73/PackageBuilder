import express from "express";
import { generateZip } from "../utils/zipGenerator.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { tasks } = req.body;
  if (!tasks || tasks.length === 0) {
    return res.status(400).json({ error: "No admin tasks selected" });
  }

  const files = tasks.map(task => ({
    name: `${task}.ps1`,
    content: `Write-Output "Running admin task: ${task}"\n# TODO: Script logic for ${task}`
  }));

  const zipStream = generateZip(files);
  res.setHeader("Content-Type", "application/zip");
  res.setHeader("Content-Disposition", "attachment; filename=admin-tasks-package.zip");
  zipStream.pipe(res);
});

export default router;
