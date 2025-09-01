import express from "express";
import { generateZip } from "../utils/zipGenerator.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { settings } = req.body;
  if (!settings || settings.length === 0) {
    return res.status(400).json({ error: "No settings selected" });
  }

  const files = settings.map(setting => ({
    name: `${setting}.ps1`,
    content: `Write-Output "Applying setting: ${setting}"\n# TODO: Script logic for ${setting}`
  }));

  const zipStream = generateZip(files);
  res.setHeader("Content-Type", "application/zip");
  res.setHeader("Content-Disposition", "attachment; filename=settings-package.zip");
  zipStream.pipe(res);
});

export default router;
