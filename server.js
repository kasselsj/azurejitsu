const express = require("express");
const path = require("path");
const helmet = require("helmet");

const app = express();

// Security middleware
app.use(helmet());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Fallback route (optional if you add more pages)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

