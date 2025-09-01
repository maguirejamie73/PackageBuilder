import express from "express";
import { generateZip } from "../utils/zipGenerator.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { apps } = req.body;
  if (!apps || apps.length === 0) {
    return res.status(400).json({ error: "No apps selected" });
  }

  const files = apps.map(app => ({
    name: `${app}.ps1`,
    content: `Write-Output "Installing ${app}"\n# TODO: Insert ${app} install script`
  }));

  const zipStream = generateZip(files);
  res.setHeader("Content-Type", "application/zip");
  res.setHeader("Content-Disposition", "attachment; filename=apps-package.zip");
  zipStream.pipe(res);
});

export default router;
