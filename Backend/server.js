import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

import appsRoute from "./routes/apps.js";
import settingsRoute from "./routes/settings.js";
import adminRoute from "./routes/admin.js";
import printersRoute from "./routes/printers.js";

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json());

// API routes
app.use("/api/generate/apps", appsRoute);
app.use("/api/generate/settings", settingsRoute);
app.use("/api/generate/admin", adminRoute);
app.use("/api/generate/printer", printersRoute);

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../frontend")));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
