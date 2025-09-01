import express from "express";
import { generateZip } from "../utils/zipGenerator.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { printers } = req.body;
  if (!printers || printers.length === 0) {
    return res.status(400).json({ error: "No printers selected" });
  }

  const files = printers.map(printer => ({
    name: `${printer}.ps1`,
    content: `Write-Output "Installing printer: ${printer}"\n# TODO: Printer install script for ${printer}`
  }));

  const zipStream = generateZip(files);
  res.setHeader("Content-Type", "application/zip");
  res.setHeader("Content-Disposition", "attachment; filename=printers-package.zip");
  zipStream.pipe(res);
});

export default router;
